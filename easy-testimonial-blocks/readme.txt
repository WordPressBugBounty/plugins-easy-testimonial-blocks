=== Easy Testimonial Blocks ===
Contributors: binsaifullah
Tags: testimonial, testimonials, testimonial block, gutenberg blocks, reviews
Requires at least: 6.5
Tested up to: 7.1
Stable tag: 1.1.1
Requires PHP: 7.0
License: GPLv2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

Displays customer reviews, ratings and photos in a responsive grid in Gutenberg block editor — no coding required.

== Description ==

Easy Testimonial Blocks adds a ready-made testimonial block to the WordPress block editor (Gutenberg). Showcase your customers' reviews, star ratings and photos in a clean, responsive testimonial grid — perfect for agency sites, business websites, landing pages and portfolios.

**Why Easy Testimonial Blocks?**

* **Native Gutenberg block** – built with the block editor, no page builder or shortcodes needed
* **Customer reviews with star ratings** – display ratings out of 5 with crisp SVG stars
* **Responsive testimonial grid** – set different columns for desktop, tablet and mobile
* **Full design control** – colors, typography, borders, border radius, padding and box shadow
* **Quote icons** – choose from four built-in quote icon styles
* **Reviewer photos** – custom photo size, border and border radius
* **Fast and lightweight** – zero JavaScript on the frontend, assets load only on pages that use the blocks
* **Works with any theme** – built on standard WordPress block APIs

### Video Tutorial
[youtube https://www.youtube.com/watch?v=4J7tbJ3NQWQ]

== Installation ==

1. Upload the plugin files to the `/wp-content/plugins/easy-testimonial-blocks` directory, or install the plugin through the WordPress plugins screen directly.
2. Activate the plugin through the 'Plugins' screen in WordPress.
3. In the block editor, search for "Testimonial Grid" and insert the block.
4. Add your testimonial items and customize the design from the block sidebar settings.

== Frequently Asked Questions ==

= Will it slow down my website? =

No. The plugin is built with native Gutenberg components. There is no JavaScript on the frontend, and its styles are loaded only on pages where the testimonial blocks are used.

= Do I need to know how to code? =

No. Every setting — layout, colors, typography, borders, border radius and ratings — is available from the block editor sidebar.

= Can I change the number of testimonial columns? =

Yes. The grid supports separate column settings for desktop, tablet, and mobile.

= Can I show star ratings with the testimonials? =

Yes. Each testimonial supports a rating out of 5, including fractional values like 4.3, rendered as crisp SVG stars.

= Which WordPress version do I need? =

The plugin requires WordPress 6.5 or higher and PHP 7.0 or higher.

= Does it work with any WordPress theme? =

Yes. The blocks are built with standard WordPress block APIs and work with any properly coded theme.

== Changelog ==
**1.1.1**
* Hardened the grid block's inline CSS generation with dedicated color, dimension and keyword sanitizers to prevent malicious block attribute values from injecting CSS

**1.1.0**
* Replaced styled-components with lightweight dynamic CSS in the editor (smaller bundle)
* Replaced react-rater with a native SVG star rating component in the editor and on the frontend
* Testimonial stars now render without jQuery on the frontend
* Sidebar settings reorganized into native Settings and Styles tabs
* Updated development dependencies

**1.0.1**
* Change the block title 
* Add admin support page

**1.0.0**
* Initial release
