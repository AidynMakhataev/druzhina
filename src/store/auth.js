export default {
    state: {
        user_email: null,
        user_name: null
    },
    initialize() {
        this.state.user_email = localStorage.getItem('user_email')
        this.state.user_name = localStorage.getItem('user_name')
    },
    set(user_email, user_name) {
        localStorage.setItem('user_email', user_email)
        localStorage.setItem('user_name', user_name)
        this.initialize()
    },
    remove() {
        localStorage.removeItem('user_email')
        localStorage.removeItem('user_name')
        this.initialize()
    }
}