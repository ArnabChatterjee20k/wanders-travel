const name = document.getElementById("name");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const message = document.getElementById("message");

const btn = document.getElementById("btn");
let is_name = false;
let is_email = false;
let is_message = false;
let is_phone = false;

function indicator(container, regex) {
    let str = container.value
    let check = regex.test(str)
    if (check) {
        container.classList.remove("is-invalid")
        return true
    } else {
        container.classList.add("is-invalid")
        return false
    }
}

name.addEventListener("blur", () => {
    // name vaidation
    let regex = /^[a-zA-z]([0-9a-zA-Z]){1,20}$/ //must start with a-z or A-Z and then we can have the grp 1 to 10 times that group
        // must start with character and endswith that 1 to 10 group

    is_name = indicator(name, regex)

})

email.addEventListener("blur", () => {
    let regex = /^([_\-\.a-zA-Z0-9]+)@([_\-\.a-zA-Z0-9]+)\.([a-zA-Z]){2,5}$/
    is_email = indicator(email, regex)
})

phone.addEventListener("blur", () => {
    let regex = /^([0-9]){10}$/ // must start with 0 - 9 and must endswith 0 to 9 exactly 10 times
    is_phone = indicator(phone, regex)
})

message.addEventListener("blur", () => {
    let regex = /^.{0,100}$/
    is_message = indicator(message, regex)
})

btn.onclick = function() {
    function show(notice, category) {
        let alert = document.getElementById("alert")
        alert.innerHTML = `<div class="alert alert-${category} alert-dismissible fade show my-3" role="alert">
                        <strong>Attention!</strong> ${notice}
                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>`
    }
    if (is_name && is_phone && is_message && is_email) {
        let form = new FormData()
        form.set("name", name.value)
        form.set("email", email.value)
        form.set("phone", phone.value)
        form.set("message", message.value)
        let now = post_Data(form)
        now.then(data => {
            console.log(data);
            show("Success", "success")
        })
    } else {
        show("Not", "danger")
    }
}

async function post_Data(data) {
    // url = "http://127.0.0.1:5000/"
    url = "https://mailapi-arnab.herokuapp.com/"

    params = {
        method: 'POST',
        // headers: { "Content-Type": "application/json" },
        // mode: 'no-cors',
        body: data
    }
    const res = await fetch(url, params)
    const response = await res.json()
    return response
}