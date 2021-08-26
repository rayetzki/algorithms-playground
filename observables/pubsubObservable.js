const Publisher = {
  subscribers: [],
  subscribe(method, pubType = "any") {
    if (!this.subscribers[pubType]) this.subscribers[pubType] = [];
    this.subscribers[pubType].push(method);
  },
  visitSubscribers(action, arg, pubType = "any") {
    if (action === "publish") {
      this.subscribers[pubType].forEach((subscriber) => subscriber(arg));
    } else {
      this.subscribers.splice(index, 1);
    }
  },
  publish(publication, pubType) {
    this.visitSubscribers("publish", publication, pubType);
  },
  unsubscribe(method, pubType) {
    this.visitSubscribers("unsubscribe", method, pubType);
  },
};

const publisherFactory = (candidate) => {
  candidate.subscribers = [];
  for (method in Publisher) {
    candidate[method] = Publisher[method];
  }
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
