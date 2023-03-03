from flask import Flask

app = Flask(__name__)

instructions = []

@app.route("/","GET")
def getNextInstruction():
  return instructions.pop(0)
  
