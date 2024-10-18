import { displayForm } from './lib/index';
import './style.css';

const appElement = document.querySelector('#app');

appElement.innerHTML = `
    <main>
        <div class="pagination">
                <span class="page-indicator active">1</span>
                <span class="page-indicator">2</span>
        </div>
        <section aria-labelledby="welcome">
            <h2 title="welcome">Welcome to our Website</h2>
            <button id="next-btn">Next</button>
            <div class="form-container"></div>
        </section>
    </main>
`;
const btn = document.getElementById("next-btn");
const pageIndicators = document.querySelectorAll('.page-indicator');

const displayContent = () => {
    displayForm();
    btn.classList.add("hidden");
    pageIndicators[0].classList.remove("active");
    pageIndicators[1].classList.add("active");
};

btn.addEventListener("click", displayContent);
