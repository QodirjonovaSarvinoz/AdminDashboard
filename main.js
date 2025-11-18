document.getElementById("btn-manage-teachers")?.addEventListener("click", () => {
    window.location.href = "teachers.html";
});

document.getElementById("btn-manage-students")?.addEventListener("click", () => {
    window.location.href = "students.html";
});

(function () {
    const path = window.location.pathname;

    const menu = {
        "index": "nav-dashboard",
        "teachers": "nav-teachers",
        "students": "nav-students",
        "settings": "nav-settings"
    };

    for (let key in menu) {
        if (path.includes(key)) {
            document.getElementById(menu[key])?.classList.add(
                "bg-gray-100",
                "font-semibold",
                "text-purple-600"
            );
        }
    }
})();

