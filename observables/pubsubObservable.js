class Publisher {
  constructor() {
    this.subscribers = [];

    this.subscribe = function (method, pubType = "any") {
      if (!this.subscribers[pubType]) this.subscribers[pubType] = [];
      this.subscribers[pubType].push(method);
    };

    this.visitSubscribers = function (action, arg, pubType = "any") {
      this.subscribers[pubType].forEach((subscriber, index) => {
        if (action === "publish") {
          subscriber(arg);
        } else if (subscriber === arg) {
          this.subscribers.splice(index, 1);
        }
      });
    };

    this.publish = function (publication, pubType) {
      this.visitSubscribers("publish", publication, pubType);
    };

    this.unsubscribe = function (method, pubType) {
      this.visitSubscribers("unsubscribe", method, pubType);
    };
  }
}

const publisherFactory = (candidate) => {
  const publisher = new Publisher();
  for (method in publisher) {
    candidate[method] = publisher[method];
  }
  candidate.subscribers = [];
};

class Paper {
  daily() {
    this.publish("big news today");
  }

  monthly() {
    this.publish("interesting analysis", "monthly");
  }
}

class Reader {
  drinkCoffee(paper) {
    console.log(`Just read ${paper}`);
  }

  sundayPreNap(monthly) {
    console.log(`About to fall asleep reading this ${monthly}`);
  }
}

const paper = new Paper();
const blogger = new Reader();

publisherFactory(paper);

paper.subscribe(blogger.drinkCoffee);
paper.subscribe(blogger.sundayPreNap, "monthly");

paper.daily();
paper.monthly();

publisherFactory(blogger);

Object.assign(blogger, {
  tweet(msg) {
    this.publish(msg);
  },
});

Object.assign(paper, {
  readTweets(tweet) {
    console.log(`Call big meeting! Someone ${tweet}`);
  },
});

blogger.subscribe(paper.readTweets);
blogger.tweet("hated the paper today");
