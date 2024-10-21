function showTab(tab) {
    const contents = document.querySelectorAll('.tab-content');
    const buttons = document.querySelectorAll('.tab-btn');

    contents.forEach(content => content.classList.remove('active'));
    buttons.forEach(button => button.classList.remove('active'));

    document.getElementById(tab).classList.add('active');
    event.currentTarget.classList.add('active');
}
