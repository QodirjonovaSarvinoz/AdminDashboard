const maleImages = [
    "https://randomuser.me/api/portraits/men/28.jpg",
    "https://randomuser.me/api/portraits/men/12.jpg",
    "https://randomuser.me/api/portraits/men/32.jpg",
    "https://randomuser.me/api/portraits/men/14.jpg"
];

const femaleImages = [
    "https://randomuser.me/api/portraits/women/11.jpg",
    "https://randomuser.me/api/portraits/women/12.jpg",
    "https://randomuser.me/api/portraits/women/23.jpg",
    "https://randomuser.me/api/portraits/women/14.jpg"
];

function getRandomImg(gender, index) {
    return gender === "Male" ? maleImages[index % maleImages.length] : femaleImages[index % femaleImages.length];
}

let students = [
    { id: 1, name: "Kristopher Lemke", gender: "Male", grade: 4, experience: 7, rating: 4.7, coins: 1200 },
    { id: 2, name: "Kenneth Erdman", gender: "Female", grade: 5, experience: 3, rating: 4.2, coins: 900 },
    { id: 3, name: "Tyler Purdy", gender: "Male", grade: 6, experience: 5, rating: 4.8, coins: 1500 },
    { id: 4, name: "Ora Keeling", gender: "Female", grade: 4, experience: 6, rating: 4.4, coins: 1100 }
];

while (students.length < 80) {
    students.push({
        id: students.length + 1,
        name: "Student " + (students.length + 1),
        gender: Math.random() > 0.5 ? "Male" : "Female",
        grade: Math.floor(Math.random() * 12) + 1,
        experience: Math.floor(Math.random() * 10) + 1,
        rating: (Math.random() * 2 + 3).toFixed(1),
        coins: Math.floor(Math.random() * 2000)
    });
}

function renderStudents() {
    const container = document.getElementById("studentsContainer");
    container.innerHTML = "";

    const searchValue = document.getElementById("searchInput").value.toLowerCase();
    const genderValue = document.getElementById("genderFilter").value;
    const ratingValue = document.getElementById("ratingFilter").value;

    students
        .filter(s => s.name.toLowerCase().includes(searchValue))
        .filter(s => genderValue === "all" || s.gender === genderValue)
        .filter(s => ratingValue === "all" || s.rating >= Number(ratingValue))
        .forEach((s, i) => {
            const img = getRandomImg(s.gender, i);

            const card = document.createElement("div");
            card.className = "group w-full max-w-sm mx-auto bg-white shadow-md rounded-2xl p-6 space-y-4 transition-transform duration-300 hover:scale-105";

            card.innerHTML = `
               
                <div class="flex justify-center">
                    <img src="${img}" class="w-28 h-28 rounded-full object-cover border-[4px] border-purple-100" />
                </div>

                <!-- Name + Grade -->
                <div class="text-center space-y-1">
                    <h2 class="text-xl font-semibold">${s.name}</h2>
                    <div class="flex justify-center items-center gap-2">
                        <span class="px-3 py-1 text-sm bg-blue-100 text-blue-600 rounded-full">
                            Grade ${s.grade}
                        </span>
                        <span class="text-gray-600 text-sm">${s.experience}y</span>
                    </div>
                </div>

                <!-- Rating + Coins -->
                <div class="flex justify-between items-center px-1">
                    <div class="flex items-center gap-1 text-yellow-500">
                        ⭐ <span class="text-gray-700 font-medium">${s.rating}</span>
                    </div>
                    <div class="flex items-center gap-1 text-yellow-500">
                        🪙 <span class="text-gray-700 font-medium">${s.coins}</span>
                    </div>
                </div>

                <!-- Progress Bar -->
                <div class="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div class="h-full bg-black" style="width: ${Math.min(s.experience * 10, 100)}%"></div>
                </div>

                <!-- Contact Info -->
                <div class="space-y-2 text-sm">
                    <div class="flex items-center gap-2 text-gray-700">
                        📞 <span>(555) 123-4567</span>
                    </div>
                    <div class="flex items-center gap-2 text-gray-700">
                        📧 <span>${s.name.replace(" ", ".").toLowerCase()}@school.com</span>
                    </div>
                    <div class="flex items-center gap-2 text-gray-700">
                        📩 <span>@${s.name.toLowerCase().split(" ")[0]}</span>
                    </div>
                    <div class="flex items-center gap-2 text-gray-700">
                        🌐 <span>linkedin.com/in/${s.name.replace(" ", "-").toLowerCase()}</span>
                    </div>
                   <div class="flex gap-5 pt-[20px] opacity-0 group-hover:opacity-100 transition-opacity">
            <button class="bg-white border border-black-1 text-black px-3 py-1 rounded-xl" onclick="editCard(this)">Edit</button>
            <button class="bg-white border border-black-1 text-red-600 px-3 py-1 rounded-xl" onclick="this.closest('.card').remove()">Delete</button>
        </div>
                </div>
            `;
            container.appendChild(card);
        });
}

document.getElementById("searchInput").addEventListener("input", renderStudents);
document.getElementById("genderFilter").addEventListener("change", renderStudents);
document.getElementById("ratingFilter").addEventListener("change", renderStudents);

renderStudents();
