from django.http import JsonResponse


class JsonResponseBadRequest(JsonResponse):

    def __init__(self, *args, **kwargs):
        kwargs.update({'status': 400})
        super(JsonResponseBadRequest, self).__init__(*args, **kwargs)
