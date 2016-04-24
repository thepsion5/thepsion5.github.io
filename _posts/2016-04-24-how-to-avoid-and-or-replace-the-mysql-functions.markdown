---
layout: post
title:  "How to Avoid and/or Replace the mysql_* Functions"
date:   2016-04-24 11:24:00
---
As part of my ongoing interest in making positive contributions to the
greater PHP community, I'm starting a series of small tutorials culled
from questions I've seen various places like [/r/phphelp](http://reddit.com/r/phphelp)
and the [PHP Facebook Group](https://www.facebook.com/groups/2204685680).
Nothing especially complex or deep, but I really want to promote good
coding practices and combat some of the horrifyingly bad tutorials that
may still teaching beginners the wrong way to do things.

I still see lots of tutorials, and lots of people new to PHP, using 
the `mysql_*` functions when writing their database interaction code.
**Don\'t do this.** Those functions [have been deprecated
as of PHP 5.5](http://php.net/manual/en/mysqlinfo.api.choosing.php) and
are actually removed as of PHP 7. Using these functions will lead to
code that is harder to maintain and less secure. This Post will discuss
the two best alternatives - Mysqli and PDO, and we'll be refactoring this
simple site visitor counting function as an example:

{% highlight php %}
<?php
/**
 * @param string $visitorIp The IP address of the visitor to be counted
 * @return integer The total number of visitors
 **/
function incrementSiteCounter($visitorIp)
{
    mysql_connect('localhost', 'user', 'password');
    mysql_select_db('your_database');
    $visitorIp = mysql_real_escape_string($visitorIp);
    mysql_query("INSERT INTO `visitors` (ip, visits) VALUES('$visitorIp', 1) ON DUPLICATE KEY UPDATE visits=visits+1");
    $countResults = mysql_query('SELECT SUM(visits) as count FROM `visitors`');_
    $countRow = mysql_fetch_assoc($countResults);
    return (int) $countRow['counts'];
}
?>
{% endhighlight php %}

**NOTE:** The above code is bad. Do not use it. It will make me very sad.

## Mysqli

Mysqli has the advantage of having a very similar API to the old mysql
functions. The primary difference is the connection is specified as part
of the function parameters for `mysqli_query` and `mysqli_real_escape_string`.
The new code is written using the procedural functions, similar to the
original mysql:

{% highlight php %}
<?php
function incrementSiteCounter($visitorIp)
{
    //create a new mysqli connection instance
    $connection = new mysqli('localhost', 'user', 'password', 'your_database');
    $visitorIp = mysqli_real_escape_string($link, $visitorIp);
    mysqli_query($link, "INSERT INTO `visitors` (ip, visits) VALUES('$visitorIp', 1) ON DUPLICATE KEY UPDATE visits=visits+1");
    $countResults = mysqli_query($link, 'SELECT SUM(visits) as `count` FROM `visitors`');
    $countRow = mysqli_fetch_assoc($countResults);
    return (int) $countRow['count'];
}
{% endhighlight %}

There's also an object-oriented API, but I personally find it a bit clunky,
which is why I much prefer the next method - PDO.

## PHP Data Objects (PDO)

[PHP Data Objects](http://php.net/manual/en/book.pdo.php) (commonly
abbreviated to PDO) and is the preferred method for connecting to a
database in modern PHP. It supports prepared statements, which will help
protect you against SQL injection attacks, and has a much better API,
in my opinion. Prepared statements remove the necessity to manually escape
our data and the `PDO_Statement` class provides a ton of different ways
to collect and manage the results.

{% highlight php %}
<?php
function incrementSiteCounter($visitorIp)
{
    //create a new PDO instance with the correct database credentials
    $pdo = new PDO('mysql:host=localhost;dbname=your_database', 'user', 'password');
    //Create and execute a query statement
    //By using prepare(), the "?" will be replaced with the $visitorIp variable specified during execute()
    $statement = $pdo->prepare('INSERT INTO `visitors` (ip, visits) VALUES(?, 1) ON DUPLICATE KEY UPDATE visits=visits+1');
    $statement->execute([$visitorIp]);
    //fetch the first column of the result and return it
    return (int) $pdo->query('SELECT SUM(visits) FROM `visitors`')->fetchColumn();
}
{% endhighlight %}

And there you have it! There are some [great tutorials on using PDO](https://phpdelusions.net/pdo)
and it's running under the hood of every modern PHP ORM out there. There
are also several nice libraries that [add functionality to PDO](https://github.com/auraphp/Aura.Sql) 
and generally save you time, energy and tears. Thanks for reading!