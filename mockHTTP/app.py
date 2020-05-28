from flask import Flask, send_file

app = Flask(__name__)

@app.route('/rest/api/1.0/projects/<projectKey>/repos')
def projects(projectKey):
    return send_file(f'project-{projectKey}-repos.json')

@app.route('/rest/api/1.0/projects/<projectKey>/repos/<repositorySlug>/pull-requests')
def pullRequests(projectKey, repositorySlug):
    return send_file(f'project-{projectKey}-repo-{repositorySlug}-pull-requests.json')

