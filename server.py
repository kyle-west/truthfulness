# This is for developement convenience only, as the Truthfulness
# package does NOT need a server to function
# Adapted from source found in docs:
#    https://docs.python.org/2/library/simplehttpserver.html
import http.server
import socketserver
PORT = 5000
HANDLER = http.server.SimpleHTTPRequestHandler
HTTPD = socketserver.TCPServer(("", PORT), HANDLER)
print("serving at port", PORT)
HTTPD.serve_forever()
