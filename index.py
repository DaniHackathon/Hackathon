from http.server import BaseHTTPRequestHandler
import json
import random

class handler(BaseHTTPRequestHandler):

    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()

    def do_GET(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Content-type', 'application/json')
        self.end_headers()
        
        data = [
            {"platform": "Instagram", "time": random.randint(5, 100), "data": random.randint(100, 10000)},
            {"platform": "Facebook", "time": random.randint(5, 100), "data": random.randint(100, 10000)},
            {"platform": "Twitter", "time": random.randint(5, 100), "data": random.randint(100, 10000)},
            {"platform": "LinkedIn", "time": random.randint(5, 100), "data": random.randint(100, 10000)},
            {"platform": "TikTok", "time": random.randint(5, 100), "data": random.randint(100, 10000)},
            {"total": 10000}
        ]
    
        self.wfile.write(json.dumps(data).encode('utf-8'))
        return
