==========================
Firefox Extension for Mint
==========================

.. _Mint: https://mint.intuit.com/

.. _`Firefox Extension`: https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Anatomy_of_a_WebExtension

Motivation
==========

Mint_ is a great financial transactions aggregator but when it messes anything up,
say by double- or triple-booking it, or doesn't import more than a handful items
from an account with hundreds of transactions, there's very little recourse. This
extension is an attempt to add missing pieces to an otherwise great and free
service. And learn how to make Firefox extensions.

Bulk Import
~~~~~~~~~~~

Mint allows single transaction to be added but wouldn't bulk-import them from say
a CSV file.

Duplicate Detection
~~~~~~~~~~~~~~~~~~~

Import process somehow goes astray and two or three copies of the same transaction
appear. It also happens if one charges their PayPal to their credit card and both
PayPal and the credit card are in Mint.

Construction
============

`Firefox Extension`_ is a good start. This `Writing a Simple Firefox Extension
<https://kaiwern.com/posts/2022/02/12/writing-a-simple-firefox-extension/>`_ blog
provided a nice guiding summary.

Testing
~~~~~~~

So how do I test this thing, preferably with automation?