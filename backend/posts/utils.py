import uuid


from .models import Post, Comment


def get_all_posts():
    return Post.objects.all()


def get_post_uuid():
    posts_set = get_all_posts()
    while True:
        _uuid = uuid.uuid4()
        if not posts_set.filter(uuid=_uuid):
            return _uuid


def get_comment_uuid():
    comment_set = Comment.objects.all()
    while True:
        _uuid = uuid.uuid4()
        if not comment_set.filter(uuid=_uuid):
            return _uuid


def get_post(post_uuid=None):
    if post_uuid is None:
        return None
    try:
        post = Post.objects.get(uuid=post_uuid)
        return post
    except Post.DoesNotExist:
        return None


def get_comments_by_post(post=None):
    if post is None:
        return []
    comments = Comment.objects.all().filter(post=post)
    return comments


def create_comment(**kwargs):
    return Comment.objects.create(**kwargs)