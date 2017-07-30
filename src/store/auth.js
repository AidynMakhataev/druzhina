export default {
    state: {
        user_email: null
    },
    initialize() {
        this.state.user_email = localStorage.getItem('user_email')
    },
    set(user_email) {
        localStorage.setItem('user_email', user_email)
        this.initialize()
    },
    remove() {
        localStorage.removeItem('user_email')
        this.initialize()
    }
}