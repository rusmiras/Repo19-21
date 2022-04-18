const Keyboard = {
    eventHandlers: {
        oninput: null,
        onclose: null
    },

    properties: {
        value: "",
        capsLock: false,
        shift: false
    },

    init() {
        document.querySelectorAll(".key").forEach(key => {
            key.addEventListener("click", () => {
                switch (key.value) {
                    case "backspace":
                        this.properties.value = this.properties.value.substring(0, this.properties.value.length - 1);
                        this._triggerEvent("oninput");
                        break;
                    case "capslock":
                        this._toggleCapsLock();
                        break;
                    case "shift":
                        this.properties.shift = true;
                        break;
                    case "space":
                        this.properties.value += " ";
                        this._triggerEvent("oninput");
                        break;
                    case "enter":
                        this.properties.value += "\n";
                        this._triggerEvent("oninput");
                        break;
                    case "ok":
                        this.close();
                        this._triggerEvent("onclose");
                        break;
                    default:
                        if (this.properties.capsLock && this.properties.shift) {
                            this.properties.value += key.value.toLowerCase();
                            this.properties.shift = false;
                        }
                        else if (this.properties.capsLock || this.properties.shift) {
                            this.properties.value += key.value.toUpperCase();
                            this.properties.shift = false;
                        }
                        else {
                            this.properties.value += key.value.toLowerCase();
                        }
                        this._triggerEvent("oninput");
                        break;
                }
            });
        });
        document.querySelectorAll(".text-area").forEach(input => {
            input.addEventListener("focus", () => {
                this.open(currentValue => {
                        input.value = currentValue;
            });
            });
            document.querySelector("#ok").addEventListener("click", () => {
                input.value = "";
            });
        });
    },

    _triggerEvent(handlerName) {
        if (typeof this.eventHandlers[handlerName] == "function") {
            this.eventHandlers[handlerName](this.properties.value);
        }
    },

    _toggleCapsLock() {
        this.properties.capsLock = !this.properties.capsLock;
    },

    open(oninput, onclose) {
        this.eventHandlers.oninput = oninput;
        this.eventHandlers.onclose = onclose;
    },
    close() {
        alert(this.properties.value);
        this.properties.value = "";
        this.eventHandlers.oninput = oninput;
        this.eventHandlers.onclose = onclose;
    }

};

window.addEventListener("DOMContentLoaded", function () {
    Keyboard.init();
});
