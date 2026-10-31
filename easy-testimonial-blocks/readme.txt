=== Easy Testimonial Blocks – Testimonial Grid, Customer Reviews & Star Ratings ===
Contributors: binsaifullah
Tags: testimonial, testimonials, testimonial block, customer reviews, star ratings
Requires at least: 6.5
Tested up to: 7.1
Stable tag: 1.1.2
Requires PHP: 7.0
License: GPLv2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

Testimonial block for the WordPress block editor. Show customer reviews, star ratings and photos in a responsive testimonial grid. No coding.

== Description ==

**Easy Testimonial Blocks** is a lightweight testimonial plugin built for the WordPress block editor (Gutenberg). Add a testimonial grid to any page, post or template in seconds. You can show client testimonials, customer reviews, star ratings and reviewer photos without shortcodes, page builders or code.

Social proof turns visitors into customers. A well-designed testimonials section on your homepage, landing page, pricing page or service page builds trust where buyers make up their minds. Easy Testimonial Blocks makes that section quick to build and easy to match to your brand. It keeps your site fast too.

= Who is it for? =

* **Small businesses and local services** – show what happy customers say about you
* **Agencies and freelancers** – client testimonials for portfolios and case studies
* **SaaS, apps and online courses** – customer reviews next to your pricing and sign-up buttons
* **Coaches, consultants and creators** – personal recommendations that build credibility
* **E-commerce and product pages** – highlight ratings and buyer feedback

= Key features =

* **Native testimonial block** – built with core WordPress block APIs. No shortcodes, no page builder, no lock-in.
* **Responsive testimonial grid** – set columns and spacing separately for desktop, tablet and mobile
* **Star ratings** – show ratings out of 5, including decimals like 4.5 or 4.8, with crisp SVG stars and an optional number
* **Reviewer details** – name, job title, company and photo for every testimonial
* **Reviewer photos** – responsive, lazy-loaded images with size, border and border radius controls
* **Quote icons** – choose from four quote icon styles and set their size, color and opacity
* **Design controls** – background, text and rating colors, font sizes, alignment, borders, border radius, padding and box shadow
* **Live device preview** – responsive settings follow the editor's desktop, tablet and mobile preview
* **SEO-friendly markup** – choose the HTML tag for reviewer names (H2–H6, paragraph or div) to keep your heading structure clean
* **Accessible** – screen reader labels for ratings and alt text for reviewer photos
* **Fast and lightweight** – no JavaScript on the frontend, no jQuery, and CSS loads only on pages that use the block
* **Works with any theme** – block themes, classic themes, full site editing and block-based widget areas
* **Translation ready** – every label can be translated, and RTL languages are supported

= How it works =

1. Insert the **Testimonial Grid** block from the block inserter.
2. Type the testimonial text, then add the reviewer's name, title, company and photo.
3. Set the star rating for each testimonial.
4. Adjust columns, colors, icons and spacing from the block sidebar.
5. Publish. Your testimonials section is live and responsive.

= Video tutorial =

[youtube https://www.youtube.com/watch?v=4J7tbJ3NQWQ]

= Built for performance =

Many testimonial plugins load sliders, jQuery and large stylesheets on every page. Easy Testimonial Blocks renders plain HTML and inline SVG on the server. It adds no frontend JavaScript and loads its styles only where the block is used. That keeps your Core Web Vitals and PageSpeed scores healthy.

= Support and feedback =

Found a bug or have a feature request? Open a thread in the [support forum](https://wordpress.org/support/plugin/easy-testimonial-blocks/). If the plugin helps your site, please [leave a review](https://wordpress.org/support/plugin/easy-testimonial-blocks/reviews/#new-post). It helps other people find it.

== Installation ==

= From your WordPress dashboard =

1. Go to **Plugins → Add New Plugin**.
2. Search for **Easy Testimonial Blocks**.
3. Click **Install Now**, then **Activate**.
4. Open any page or post in the block editor, click **+** and search for **Testimonial**.

= Manual installation =

1. Download the plugin zip file.
2. Go to **Plugins → Add New Plugin → Upload Plugin** and upload the zip, or unzip it into `/wp-content/plugins/easy-testimonial-blocks/`.
3. Activate the plugin from the **Plugins** screen.

After activation, a short guide and video tutorial are available under **Tools → Testimonial Blocks**.

== Frequently Asked Questions ==

= How do I add testimonials to my WordPress site? =

Open a page or post in the block editor and insert the **Testimonial Grid** block. Each grid starts with two testimonial items. Fill in the text, reviewer details and rating, and add more items with the block appender.

= Is Easy Testimonial Blocks free? =

Yes. The plugin is 100% free and open source under the GPL.

= Will it slow down my website? =

No. The plugin outputs no JavaScript on the frontend, and its CSS loads only on pages that contain a testimonial block. Reviewer photos use responsive image sizes with lazy loading.

= Can I show star ratings with each testimonial? =

Yes. Every testimonial has a rating from 0 to 5, including decimal values such as 4.5. Stars are drawn as SVG, so they stay sharp on every screen. You can also show the number next to the stars or hide the rating.

= Can I change the number of columns on mobile? =

Yes. Columns, gaps, font sizes, icon sizes, photo sizes and padding can each be set separately for desktop, tablet and mobile.

= Does it work with block themes and full site editing? =

Yes. You can use the testimonial block in posts, pages, templates, template parts and block-based widget areas, with both block themes and classic themes.

= Do I need to know how to code? =

No. Every option is in the block sidebar, under the Settings and Styles tabs.

= Can I add a photo or avatar for each reviewer? =

Yes. Upload or choose a photo from the Media Library for each testimonial. You can set the photo size, border and border radius, for example to make round avatars.

= Can I import Google reviews or show a testimonial slider? =

Not yet. You add testimonials by hand inside the block, and they display in a responsive grid. A slider layout and more testimonial features are planned. Suggestions are welcome in the support forum.

= Is the plugin translation ready? =

Yes. All strings can be translated through translate.wordpress.org, and right-to-left languages are supported.

= Which WordPress and PHP versions are required? =

WordPress 6.5 or higher and PHP 7.0 or higher.

== Screenshots ==

1. A testimonial grid with star ratings, quote icons and reviewer photos on the frontend.
2. Adding and editing testimonials directly in the block editor.
3. Layout settings: responsive columns, grid gap, reviewer name tag and quote icon styles.
4. Style settings: background, borders, border radius, padding and box shadow, plus colors and font sizes for every element.
5. Responsive preview on tablet and mobile.

== Changelog ==

= 1.1.2 =
* Fix: posts containing the testimonial grid were marked as changed every time they were opened in the editor.
* Fix: block editor strings were not translatable because of a text domain mismatch.
* Fix: duplicated grids now get their own unique styles.
* Improvement: reviewer photos use responsive, lazy-loaded image sizes instead of the full-size file.
* Improvement: star rating labels for screen readers are now translatable.
* New: choose the HTML tag for the reviewer name (H2–H6, paragraph or div).
* New: remove a reviewer photo from the block toolbar.
* New: ratings can be set to 0.

= 1.1.1 =
* Security: hardened the grid block's inline CSS generation with dedicated color, dimension and keyword sanitizers, so malicious block attribute values cannot inject CSS.

= 1.1.0 =
* Replaced styled-components with lightweight dynamic CSS in the editor (smaller bundle).
* Replaced react-rater with a native SVG star rating component in the editor and on the frontend.
* Testimonial stars now render without jQuery on the frontend.
* Sidebar settings reorganized into the native Settings and Styles tabs.
* Updated development dependencies.

= 1.0.1 =
* Changed the block title.
* Added an admin support page.

= 1.0.0 =
* Initial release.

== Upgrade Notice ==

= 1.1.2 =
Fixes posts showing unsaved changes when opened in the editor, fixes translations, and adds faster responsive reviewer photos. Recommended for all users.
