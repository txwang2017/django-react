import requests
from bs4 import BeautifulSoup
import boto3
import random
import time

from users.models import User
from posts.models import Post
from posts.utils import get_post_uuid


def fetch():
    s3 = boto3.resource('s3')
    bucket = s3.Bucket('django-react')
    host_url = "http://www.foxnews.com"
    content = requests.get(host_url + '/lifestyle.html').content
    soup = BeautifulSoup(content, 'html.parser')
    users = User.objects.all()

    articles = soup.find_all(name='article', class_='article story-1')

    for article in articles:
        try:
            time.sleep(2)
            post_uuid = get_post_uuid()
            pic_url = article.find(name='div', class_='m').find(name='img').get('src')
            pic = requests.get(pic_url).content
            obj = bucket.put_object(Body=pic, Key='post-icon-' + post_uuid)
            obj.Acl().put(ACL='public-read')
            article_title = article.find(class_='title').find(name='a').get_text()
            article_url = host_url + article.find(class_='title').find(name='a').get('href')
            article_detail = requests.get(article_url).content
            article_soup = BeautifulSoup(article_detail, 'html.parser')
            contents = article_soup.find(name='div', class_='article-body').find_all(name='p')
            contents = [content.get_text() for content in contents]
            contents = filter(lambda x: len(x.strip()) > 10, contents)
            article_content = '\n'.join(contents)

            user = users[random.randint(0, len(users))]
            read_num = random.randint(0, 100)
            Post.objects.create(
                author=user,
                title=article_title,
                content=article_content,
                read_num=random.randint(0, read_num),
                like_num=random.randint(0, read_num),
                uuid=post_uuid,
                icon=True,
            )
        except:
            continue

