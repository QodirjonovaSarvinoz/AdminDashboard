
const maleImages = [
    "https://randomuser.me/api/portraits/men/28.jpg",
    "https://randomuser.me/api/portraits/men/12.jpg",
    "https://randomuser.me/api/portraits/men/32.jpg",
    "https://randomuser.me/api/portraits/men/14.jpg",
    "https://randomuser.me/api/portraits/men/15.jpg",
    "https://randomuser.me/api/portraits/men/16.jpg",
    "https://randomuser.me/api/portraits/men/17.jpg",
    "https://randomuser.me/api/portraits/men/18.jpg",
    "https://randomuser.me/api/portraits/men/19.jpg",
    "https://randomuser.me/api/portraits/men/20.jpg",
    "https://randomuser.me/api/portraits/men/21.jpg",
    "https://randomuser.me/api/portraits/men/22.jpg",
];

const femaleImages = [
    "https://randomuser.me/api/portraits/women/11.jpg",
    "https://randomuser.me/api/portraits/women/12.jpg",
    "https://randomuser.me/api/portraits/women/23.jpg",
    "https://randomuser.me/api/portraits/women/14.jpg",
    "https://randomuser.me/api/portraits/women/15.jpg",
    "https://randomuser.me/api/portraits/women/16.jpg",
    "https://randomuser.me/api/portraits/women/17.jpg",
    "https://randomuser.me/api/portraits/women/18.jpg",
    "https://randomuser.me/api/portraits/women/19.jpg",
    "https://randomuser.me/api/portraits/women/20.jpg",
    "https://randomuser.me/api/portraits/women/21.jpg",
    "https://randomuser.me/api/portraits/women/22.jpg",
];

function getRandomImg(gender, index) {
    return gender === "Male" ? maleImages[index % maleImages.length] : femaleImages[index % femaleImages.length];
}


let teachers = [
    {
        id: 1,
        name: "Kristopher Lemke",
        gender: "Male",
        profession: "Mathematics",
        experience: 12,
        rating: 4.7
    },
    {
        id: 2,
        name: "Kenneth Erdman",
        gender: "Female",
        profession: "Biology",
        experience: 5,
        rating: 4.2,
    },
    {
        id: 3,
        name: "Tyler Purdy",
        gender: "Male",
        profession: "Computer Science",
        experience: 9,
        rating: 4.8
    },
    {
        id: 4,
        name: "Ora Keeling",
        gender: "Female",
        profession: "English Literature",
        experience: 7,
        rating: 4.4
    }
];

while (teachers.length < 24) {
    teachers.push({
        id: teachers.length + 1,
        name: "Teacher " + (teachers.length + 1),
        gender: Math.random() > 0.5 ? "Male" : "Female",
        profession: ["Mathematics", "Music", "Biology", "Geography", "History", "Physics"][Math.floor(Math.random() * 6)],
        experience: Math.floor(Math.random() * 25),
        rating: (Math.random() * 2 + 3).toFixed(1)
    });
}


const container = document.getElementById("teachersContainer");
const searchInput = document.getElementById("searchInput");
const genderFilter = document.getElementById("genderFilter");
const experienceFilter = document.getElementById("experienceFilter");
const ratingFilter = document.getElementById("ratingFilter");
const professionFilter = document.getElementById("professionFilter");


function renderTeachers() {
    container.innerHTML = "";

    const filtered = teachers.filter(t => {
        const q = searchInput.value.toLowerCase();

        if (!t.name.toLowerCase().includes(q) && !t.profession.toLowerCase().includes(q))
            return false;

        if (genderFilter.value !== "All Gender" && t.gender !== genderFilter.value)
            return false;

        let exp = t.experience;
        if (experienceFilter.value === "0-5" && !(exp >= 0 && exp <= 5)) return false;
        if (experienceFilter.value === "6-10" && !(exp >= 6 && exp <= 10)) return false;
        if (experienceFilter.value === "11-20" && !(exp >= 11 && exp <= 20)) return false;
        if (experienceFilter.value === "20+" && exp < 20) return false;

        if (ratingFilter.value === "4.5+ stars" && t.rating < 4.5) return false;
        if (ratingFilter.value === "4.0+ stars" && t.rating < 4.0) return false;
        if (ratingFilter.value === "3.5+ stars" && t.rating < 3.5) return false;

        if (professionFilter.value !== "All Profession" && t.profession !== professionFilter.value)
            return false;

        return true;
    });

    filtered.forEach((t, i) => {
        const img = getRandomImg(t.gender, i);

        const card = document.createElement("div");
        card.className = "bg-white p-5 rounded-xl shadow-md hover:shadow-xl transition relative";

        card.innerHTML = `
            <div class="relative flex flex-col items-center group">

                <div class="w-24 h-24 rounded-full overflow-hidden shadow">
                    <img src="${img}" class="w-full h-full object-cover">
                </div>

                <h2 class="mt-4 text-lg font-semibold">${t.name}</h2>

                <p class="text-sm bg-gray-100 px-3 py-1 rounded-full mt-1">${t.profession}</p>

                <div class="flex items-center gap-4 text-gray-600 text-sm mt-3">
                    <div class="flex items-center gap-2">
                        <i data-lucide="briefcase" class="w-4 h-4"></i>
                        ${t.experience}y
                    </div>
                    <div class="flex items-center gap-2">
                        <i data-lucide="user" class="w-4 h-4"></i>
                        ${t.gender}
                    </div>
                </div>

                <div class="flex items-center gap-1 mt-3 text-yellow-500">
                    <i data-lucide="star" class="w-4 h-4 fill-yellow-400"></i>
                    <span class="text-gray-800 font-medium">${t.rating}</span>
                </div>

                <div class="mt-5 border-t pt-3 w-full space-y-2 text-sm">

                    <div class="flex items-center gap-2">
                        <i data-lucide="phone" class="text-blue-500 w-4 h-4"></i>
                        +998 94 945 07 18
                    </div>

                    <div class="flex items-center gap-2">
                        <i data-lucide="mail" class="text-green-500 w-4 h-4"></i>
                        ${t.name.replace(" ", ".").toLowerCase()}@gmail.com
                    </div>

                    <div class="flex items-center gap-2">
                        <i data-lucide="send" class="text-blue-400 w-4 h-4"></i>
                        @${t.name.toLowerCase().split(" ")[0]}_edu
                    </div>

                    <div class="flex items-center gap-2">
                        <i data-lucide="linkedin" class="text-blue-700 w-4 h-4"></i>
                        linkedin.com/${t.name.replace(" ", "").toLowerCase()}
                    </div>

                </div>
                 <div class="flex gap-5 pt-[20px] opacity-0 group-hover:opacity-100 transition-opacity">
            <button class="bg-white border border-black-1 text-black px-3 py-1 rounded-xl" onclick="editCard(this)">Edit</button>
            <button class="bg-white border border-black-1 text-red-600 px-3 py-1 rounded-xl" onclick="this.closest('.card').remove()">Delete</button>
        </div>
            </div>
        `;

        container.appendChild(card);
    });

    lucide.createIcons();
}

renderTeachers();

[searchInput, genderFilter, experienceFilter, ratingFilter, professionFilter]
    .forEach(el => el.addEventListener("input", renderTeachers));
