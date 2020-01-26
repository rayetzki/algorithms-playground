const publisher = {
    subscribers: {
        any: []
    },
    subscribe: function (fn, type) {
        type = type || 'any'
        if (typeof this.subscribers[type] === 'undefined') {
            this.subscribers[type] = []
        }
        this.subscribers[type].push(fn)
    },
    unsubscribe: function (fn, type) {
        this.visitSubscribers('unsubscribe', fn, type)
    },
    publish: function (publication, type) {
        this.visitSubscribers('publish', publication, type)
    },
    visitSubscribers: function (action, arg, type) {
        const pubtype = type || 'any'
        const subscribers = this.subscribers[pubtype]
            
        for (let i = 0; i < subscribers.length; i += 1) {
            if (action === 'publish') {
                subscribers[i](arg)
            } else {
                if (subscribers[i] === arg) {
                    subscribers.splice(i, 1)
                }
            }
        }
    }
}

function makePublisher(o) {
    for (let i in publisher) {
        if (publisher.hasOwnProperty(i) && typeof publisher[i] === 'function') {
            o[i] = publisher[i]
        }
    }
    o.subscribers = {any: []}
}

const paper = {
    daily: function () {
        this.publish('big news today')
    },
    monthly: function () {
        this.publish('interesting analysis', 'monthly')
    }
}

makePublisher(paper)

const joe = {
    drinkCoffee: function (paper) {
        console.log(`Just read ${paper}`)
    },
    sundayPreNap: function (monthly) {
        console.log(`About to fall asleep reading this ${monthly}`)
    }
}

paper.subscribe(joe.drinkCoffee)
paper.subscribe(joe.sundayPreNap, 'monthly')

paper.daily()
paper.monthly()


makePublisher(joe)

joe.tweet = function (msg) {
    this.publish(msg)
}

paper.readTweets = function (tweet) {
    console.log(`Call big meeting! Someone ${tweet}`)
}

joe.subscribe(paper.readTweets)
joe.tweet('hated the paper today')