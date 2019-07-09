
var script = document.createElement("script");
script.src = "https://www.gstatic.com/firebasejs/5.7.1/firebase.js"; // firebase sdk js
script.onload = function() {
    firebase.initializeApp({
        apiKey: "AIzaSyCMxVj9SkeGG3bJyWh_giomOiN-F7fUVew",
        authDomain: "sriy-5abdf.firebaseapp.com",
        databaseURL: "https://sriy-5abdf.firebaseio.com",
        projectId: "sriy-5abdf",
        storageBucket: "sriy-5abdf.appspot.com",
        messagingSenderId: "73426920780"
    }); /* replace with your info */
    (function(doc, fb) {
        function reaction(_button, _action) {
            var btn = doc.getElementsByClassName(_button)[0],
                id = btn.getAttribute("data-post-id"),
                count;

            if (localStorage.getItem(_action) !== null) {
                var j = JSON.parse(localStorage[_action]);
                for (i = 0; i < j.length; i++) {
                    if (j[i] === id) btn.classList.add(_action);
                }
            };

            fb.ref(_action + "/" + id + "/total").on("value", function(e) {
                count = e.val() || 0;
                btn.querySelector(".total").innerText = count;
            });

            btn.addEventListener("click", function(t) {
                t.preventDefault();
                this.classList.toggle(_action);
                if (this.classList.contains(_action)) {
                    if (localStorage.getItem(_action) === null) {
                        localStorage.setItem(_action, JSON.stringify([id]));
                    } else {
                        var all = JSON.parse(localStorage[_action]),
                            repeated = all.filter(function(e) {
                                return e == id
                            }).length;
                        if (!repeated) {
                            all.push(id);
                            localStorage.setItem(_action, JSON.stringify(all));
                        }
                    }
                    count++;
                } else {
                    var json = JSON.parse(localStorage[_action]);
                    for (var i = 0; i < json.length; i++) {
                        if (json[i] === id) json.splice(i, 1);
                    }
                    localStorage.setItem(_action, JSON.stringify(json));
                    count--;
                }
                fb.ref(_action + "/" + id + "/total").set(count);
            })
        }
        reaction(" _lk  _18vj _18vk _42ft", "like"); // start like button
        // More button here
    })(document, firebase.database());
};
document.getElementsByTagName("body")[0].append(script);
