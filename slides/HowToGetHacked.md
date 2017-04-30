# How to get hacked

---

# About _self
```javascript 
{
	name: Josh Hollandsworth,
	job: Software Engineer,
	providerOfIncome: Asynchrony Labs,
	url: joshholl.github.io,
	twitter: twitter.com/joshholl
}
```
---

# this.about()

1. Examples of how to get hacked
1. Ways to prevent them

---

# Injection

An injection attack is one in which a malcious user "injects" random bits of code in order to attack, or obtain information about the target system

![Bobby Tables](https://imgs.xkcd.com/comics/exploits_of_a_mom.png)

_image source xkcd_

---

# eval is my bff

---

# a friend of eval is a friend of mine
1. setInterval
1. setTimeout
1. new Function

---

# Make exec-utive decisions

child_process.exec

???
	curl http://localhost:4000?path=.

	curl http://localhost:4000?path=. >> /dev/null;ps -aux
	curl http://localhost:4000?path=kill -9 

---

# Cross Site Winning

---

# You cannot contain me!

	There is never any harm in returing arbitrary files from the server are there?

---

# You still cannot contain me!
	Beware of encoding!!

---

# Not even the eventloop can save you
	
	Catastrophic backtracking
	var desiredSalary = /1(9|0+)+/

---

# Getting Buff-ers

---

# Ignore warnings, like you have since C


---

# this.done() 

Thank you!


