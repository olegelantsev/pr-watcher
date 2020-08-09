from flask import Flask, send_file, jsonify
import json
import namesgenerator

app = Flask(__name__)

@app.route('/rest/api/1.0/projects/<projectKey>/repos')
def projects(projectKey):
    return send_file(f'project-{projectKey}-repos.json')

@app.route('/rest/api/1.0/projects/<projectKey>/repos/<repositorySlug>/pull-requests')
def pullRequests(projectKey, repositorySlug):
    # return send_file(f'project-{projectKey}-repo-{repositorySlug}-pull-requests.json')
    with open(f'project-{projectKey}-repo-{repositorySlug}-pull-requests.json') as fp:
      content = json.load(fp)
    pr = content['values'][0]

    prs = []
    for i in range(30):
      new_pr = dict(pr)
      new_pr['id'] = i
      new_pr['author']['user']['displayName'] = namesgenerator.get_random_name()
      new_pr['title'] = namesgenerator.get_random_name()
      new_pr['links'] = {'self': [{'href': 'http://example.com/%d' % i}]}
      prs.append(new_pr)
    content['values'] = prs
    content['size'] = len(prs)
    return jsonify(content)

