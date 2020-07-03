# Natural Sort for Angular.js

This repo contains several variations on a library for handling natural sorting when using the `orderBy` filter.  It can also optionally be used as a standalone function by injecting the `naturalSort` service into your controller or other object.

Normally, numerical values in strings are sorted using their ascii codes in a non-inutitive manner.  Natural sorting adjusts the sorting for these items to ensure that they are sorted in the order that the user would expect.

Example:

    Before      After
    ----------- -----------
    foo-1       foo-1
    foo-11      foo-2
    foo-2       foo-5
    foo-25      foo-11
    foo-5       foo-25

The algorithm here can also handle sorting dates in common formats (if included), and version strings.

This library was highly inspired by [Ben Nadel's blog post, *User-Friendly Sort Of Alpha-Numeric Data In JavaScript*](http://www.bennadel.com/blog/2495-User-Friendly-Sort-Of-Alpha-Numeric-Data-In-JavaScript.htm).

A demo of this library in action [can be found on jsFiddle](http://jsfiddle.net/wE7H2/3/).

## General Usage

You must include one of the scripts in the `src` directory in your application.  They all have the same API, but have slightly different feature sets, so you can swap them out at any time:

 *  **naturalSortVersionDatesCaching.js**  
    This version includes all features:
     *  *Number Sorting* - Finds and standardizes integers and decimals in the string
     *  *Version Sorting* - Finds and standardizes version strings (e.g. `1.0.2`) within the string
     *  *Date Sorting* - Finds and standardizes locale-specific dates (e.g. `4/23/2012` or `23.4.2012`)
     *  *Caching* - Caches the values based on the input
 *  **naturalSortVersionDates.js** - ***Recommended Version for Most Applications***  
    Includes everything except for the caching feature.
 *  **naturalSortVersionCaching.js**  
    Includes everything except for the date functionality.
 *  **naturalSortVersion.js**  
    Includes only number and version sorting.

After including the file you want, make sure to add it to your application module:

    var app = angular.module('myApp', ['naturalSort']);

### Using with orderBy

The usage with orderBy is very simple. The `naturalSort` module adds a function onto the `$rootScope` of your application called `natural`, which can be used to sort an array based on a property of the objects that are being sorted.

	<ul>
		<li ng-repeat="item in items | orderBy:natural('title')">{{ title }}</li>
	</ul>

You can also use it in an array of sort values:

	<ul>
		<li ng-repeat="item in items | orderBy:['user.name',natural('title')]">
			{{ user.name }} - {{ title }}
		</li>
	</ul>
	
#### A Warning
Because the `natural` function is on `$rootScope`, it is only available from within controllers, or from directives that *do not* isolate their scope.  If a directive is using an isolate scope, it wil need to reference the $rootScope function directly, like so:

    <li ng-repeat="item in items | orderBy:$rootScope.natural('title')">{{ title }}</li>

### Using the Service

The service can be injected, and provides two public functions:

    app.controller("MyController", ["naturalSort", function(naturalSort) {
		
		var myArray = ...;
		
		// The naturalSort function can be used to compare two values based
		// on their natural sort value.
		myArray.sort(naturalSort.naturalSort);
		
		// The naturalValue function parses a string into a standardized
		// string that can be used for comparison.
		var natValue = naturalSort.naturalValue("Foo 12");
		
	}]);
	
## Features

### Number Sorting

Numbers are located in the string and padded out to a consistent length.  Integers are converted into decimals, then the integral part is padded with leading zeros, while the fractional part is padded with trailing zeros.  This converts numbers to look like:

    Original   Sorting Value
    3.64       00000000000000000003.64000000000000000000
    5          00000000000000000005.00000000000000000000
    11         00000000000000000011.00000000000000000000

### Version Strings

Version strings are numbers with more than one decimal point, such as `1.1.6`.  This library identifies these and pads each component of the version string to ensure logical sorting.  If a version string includes something like `-RC1`, it will be handled using the normal Number algorithm.

### Dates

Date sorting may or may not be a feature you need.  It attempts to locate date strings of the format `dd?-dd?-dddd`, where `-` can be `-`, `/`, or `.`.  Using Angular's `$locale` service, it will determine if the expected format for dates is `dd/mm/yyyy` or `mm/dd/yyyy`, and adjust the order of the dates appropriately.  Additionally, it will attempt to determine if the month field is over `13`, and swap the values accordingly, in case the user typed the string in an unknown order.

After a date is located, it is normalized to `yyyy-mm-dd`, so normal sorting can occur.

The date portion adds about 300 bytes (1.2Kb uncompressed) to the file, and it might be confusing if you never expect embedded dates, so variations that don't have that functionality are included.

### Caching

The cost for converting these strings isn't *too* high, but the library comes in a caching format if your needs meet these requirements:

 *  You are sorting a *long* list
 *  The values in the list don't change frequently, but you might add or remove items regularly
 *  Your application isn't expected to be running for an extended length of time.
 *  You don't mind wasting the memory for the cache

The cache is very simple: it's a permanent record of every item ever converted.  There's no way to clear the cache, and it doesn't have a max value.  I don't know if it would ever be useful, so I recommend against it.

## License

The code is provided under the Apache License.  Technically, you need to include the license in if you use the code, but I don't actually care.  Take it and run with it!

> ### Why Include A License At All?
> 
> Confusingly, this license is here to protect *other* users of this software.  Basically, using the Apache license means I'm giving away this code.  I don't really care what you do with it — feel free to copy it, reuse it, share it, whatever.  But if I didn't include some sort of license, you would not be legally protected if you decided to use it.

### The Apache License Preamble

> Copyright 2013 Phil DeJarnett - http://www.overzealous.com
>
> Licensed under the Apache License, Version 2.0 (the "License");  
> you may not use this file except in compliance with the License.  
> You may obtain a copy of the License at
>
>     http://www.apache.org/licenses/LICENSE-2.0
>
> Unless required by applicable law or agreed to in writing, software 
> distributed under the License is distributed on an "AS IS" BASIS, 
> WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. 
> See the License for the specific language governing permissions and 
> limitations under the License.