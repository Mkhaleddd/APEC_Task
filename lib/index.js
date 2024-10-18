import { debounce } from "./debounce,js";

export function displayForm() {
    const formArea = document.querySelector('.form-container');
    const form = document.createElement('form');
    
    const nameInput = document.createElement('input');
    nameInput.setAttribute("type", "text");
    nameInput.setAttribute("name", "name");
    nameInput.setAttribute("placeholder", "Enter your name");
    
    const selectDepartment = document.createElement('select');
    selectDepartment.setAttribute("name", "major");
    const majors = [
        'Select your department',
        'Accounting',
        'Architecture',
        'Biochemistry',
        'Biology',
        'Business Administration',
        'Engineering',
        'Computer Science',
        'Economics',
        'Education',
        'Environmental Science',
        'Finance',
        'Graphic Design',
        'Information Technology',
        'Mathematics',
        'Medicine',
        'Nursing',
        'Pharmacy',
        'Psychology',
        'Sociology'
    ];

    majors.forEach(opt => {
        const option = document.createElement("option");
        option.value = opt;
        option.textContent = opt;
        selectDepartment.appendChild(option);
    });

    const selectYear = document.createElement("select");
    selectYear.setAttribute("name", "year");
    updateSelectYearOptions(selectDepartment.value, selectYear);
    selectDepartment.addEventListener("change", () => {
        updateSelectYearOptions(selectDepartment.value, selectYear);
    });

    const submitButton = document.createElement('button');
    submitButton.textContent = 'Submit';
    submitButton.addEventListener('click', (e) => {
        e.preventDefault();
        if (nameInput.value.trim() === '' || selectDepartment.value === 'Select your major' || selectYear.value === 'Select the academic year') {
            showDebouncedToast('Please fill in all fields', 'error');
        } else {
            showDebouncedToast(`Submitted: ${nameInput.value}, ${selectDepartment.value}, ${selectYear.value} Year`, 'success');
        }
    });
    
    form.appendChild(nameInput);
    form.appendChild(selectDepartment);
    form.appendChild(selectYear);
    form.appendChild(submitButton);
    formArea.appendChild(form);
}

function updateSelectYearOptions(selectedValue, selectYear) {
    selectYear.innerHTML = ''; // Clear previous options
    let options;
    if (selectedValue === 'Select your department') {
        options = ['Select the academic year'];
    } else if (selectedValue === 'Medicine') {
        options = ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th'];
    } else if (selectedValue === 'Engineering' || selectedValue === 'Architecture') {
        options = ['Freshman', 'Sophomore', 'Junior', 'Senior 1', 'Senior 2'];
    } else if (selectedValue === 'Pharmacy') {
        options = ['1st', '2nd', '3rd', '4th', '5th'];
    } else {
        options = ['1st', '2nd', '3rd', '4th'];
    }
    
    options.forEach(opt => {
        const option = document.createElement("option");
        option.value = opt;
        option.textContent = opt;
        selectYear.appendChild(option);
    });
}

const showToast = (message, type) => {
    const toastContainer = document.getElementById("toast-container") || (() => {
        const div = document.createElement("div");
        div.id = "toast-container";
        document.body.appendChild(div);
        return div;
    })();

    const toast = document.createElement("div");
    toast.textContent = message;
    toast.className = `toast ${type}`;

    setTimeout(() => {
        toast.remove();
    }, 2500);
    
    toastContainer.appendChild(toast);
};

const showDebouncedToast = debounce(showToast, 1000);
