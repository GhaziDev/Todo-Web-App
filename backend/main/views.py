from django.shortcuts import render
from .serializers import TodoSerializer
from .models import Todo
from rest_framework import viewsets

class TodoView(viewsets.ModelViewSet):
	serializer_class = TodoSerializer
	queryset = Todo.objects.all()

	def dispatch(self, request, *args, **kwargs):
	       self.args = args
	       self.kwargs = kwargs
	       request = self.initialize_request(request, *args, **kwargs)
	       self.request = request
	       self.headers = self.default_response_headers  # deprecate?
	       try:
	           self.initial(request, *args, **kwargs)

	           # Get the appropriate handler method
	           if request.method.lower() in self.http_method_names:
	               handler = getattr(self, request.method.lower(),
	                                  self.http_method_not_allowed)
	           else:
	               handler = self.http_method_not_allowed

	           response = handler(request, *args, **kwargs)

	       except Exception as exc:
	           print(f"This is exception : {exc}")
	           response = self.handle_exception(exc)

	       self.response = self.finalize_response(request, response, *args, **kwargs)
	       print(f"This is http header : {self.headers}")
	       print(f"This is request status : {self.request}")
	       print(f"This is response status : {self.response}")
	       return self.response

# Create your views here.
