function MyPromise(executor) {
    const self = this
    self.status = 'pending'
    self.data = undefined
    self.onResolvedCallback = []
    self.onRejectedCallback = []

    function resolve(value) {
        if (self.status === 'pending') {
            self.status = 'resolved'
            self.data = value

            for (let i = 0; i < self.onResolvedCallback.length; i++) {
                self.onResolvedCallback[i](value)
            }
        }
    }

    function reject(reason) {
        if (self.status === 'pending') {
            self.status = 'rejected'
            self.data = reason

            for (let i = 0; i < self.onResolvedCallback.length; i++) {
                self.onRejectedCallback[i](reason)
            }
        }
    }

    executor(resolve, rejecte)
}

const p = new Promise((resolve, rejecte) => {
    setTimeout(() => {
        resolve(2)
    }, 2000)
})