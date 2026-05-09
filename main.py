from flask import Flask, render_template

app = Flask(__name__, template_folder='.', static_folder='.')

@app.route('/index.html')
def home():
    return render_template('index.html')

@app.route('/cr.html')
def cr():
    return render_template('cr.html')

@app.route('/ethics-statement.html')
def ethics_statement():
    return render_template('ethics-statement.html')

@app.route('/ger.html')
def ger():
    return render_template('ger.html')

@app.route('/past-work.html')
def past_work():
    return render_template('past-work.html')

@app.route('/projects.html')
def projects():
    return render_template('projects.html')

@app.route('/resume.html')
def resume():
    return render_template('resume.html')

@app.route("/assets/css/styles.css")
def styles():
    return render_template('assets/css/styles.css')

if __name__ == '__main__':
    app.run(debug=True, port=5000)