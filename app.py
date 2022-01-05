from flask import Flask , request ,jsonify
from flask_mail import Mail , Message
import threading
app = Flask(__name__)

obj = {
    "name":None,
    "phone":None,
    "email":None,
    "message":None,
    # "choice":None
}
app.config['MAIL_SERVER']='smtp.gmail.com'
app.config['MAIL_PORT'] = 465 
app.config['MAIL_USERNAME'] = 'arnabchatterjee.programmer@gmail.com' 
app.config['MAIL_PASSWORD'] = ''
app.config['MAIL_USE_TLS'] = False
app.config['MAIL_USE_SSL'] = True 
app.config["MAIL_DEFAULT_SENDER"] = ("Wander_Travels-->(Arnab)","arnabchatterjee.programmer@gmail.com")
app.config["MAIL_ASCII_ATTACHMENTS"] = False

mail = Mail(app)

@app.route('/',methods=["POST"])
def hello():
    
    form = request.form
    for i in obj:
        if i in form.keys():
            obj[i] = form.get(i)
        else:
            return {"done":False} # since return means function is over
    def submit(msg):
        with app.app_context():
            mail.send(msg)
    name = obj.get("name")
    message = obj.get("message")
    msg =  Message(subject = "Registration in Wander Travels", # already default sender mentioned
                    recipients = [obj.get("email")], # we can add more address to send bulk email.
                    html= f"<h2>Thnk you {name}. </h2><b>Thnks for your registration. We will contact you soon.</b>")        

    msg1 = Message(subject="Another client",
                    recipients=[app.config["MAIL_USERNAME"]],
                    sender=obj.get("mail"),
                    body=message
                    )
                    
    threading.Thread(target=submit,daemon=True,args=(msg,)).start()
    threading.Thread(target=submit,daemon=True,args=(msg1,)).start()
    
    print(obj)
    return jsonify({"done":True , "data":obj})
if __name__ == '__main__':
    app.run(debug=True)
