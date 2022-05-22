import { Notyf } from "notyf";
import 'notyf/notyf.min.css';


export class Notification {

    constructor(duration = 3000) {
        this.duration = duration
        this.notif = new Notyf({
            duration: this.duration,
            position: {
                x: "right",
                y: "top"
            }
        })

    }

    error(message = "ERROR") {
        this.notif.error({
            message,
            dismissible: true
        })
    }

    success(message = "SUCCESS") {
        return this.notif.success({
            message,
            dismissible: true
        })
    }
}

export function validateEmail(email) {
    const tester =
        /^[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;

    if (!email) return false;

    let emailParts = email.split("@");

    if (emailParts.length !== 2) return false;

    let account = emailParts[0];
    let address = emailParts[1];

    if (account.length > 64) return false;
    else if (address.length > 255) return false;

    let domainParts = address.split(".");
    if (
        domainParts.some(function (part) {
            return part.length > 63;
        })
    )
        return false;

    if (!tester.test(email)) return false;

    return true;
}


export function UUID(len = 5) {
    let char = "abcdefghijklmnopqrstuvwxyz1234567890".split("")
    let uuid = ""
    for (let i = 0; i < len; i++) {
        let rand = Math.floor(Math.random() * char.length);
        uuid += char[rand];
    }
    return uuid;
}

export function validURL(str) {
    var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    return !!pattern.test(str);
}