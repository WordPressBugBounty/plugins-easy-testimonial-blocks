<?php
// Stop Direct Access
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Testimonial Grid — frontend CSS builder.
 *
 * Generates the per-instance inline CSS for the etb/grid block.
 * Loaded once at plugin boot from plugin.php.
 */

 /**
  * Whitelist matcher for numeric CSS dimensions ( 10px, 2.5em, 50%, ... ).
  *
  * Accepts a bare number ( appending $default_unit ), a number already
  * carrying a known-safe unit, or a `var(--custom-prop)` reference.
  * Anything else — including values with `;`, `{`, `}`, `<`, `>`, `:` or
  * other structural characters — is rejected as empty string so it can
  * never break out of the CSS declaration it's interpolated into.
  */
 function etb_sanitize_css_dimension( $value, $default_unit = 'px' ) {
   if ( is_numeric( $value ) ) {
     return $value . $default_unit;
   }
   if ( ! is_string( $value ) ) {
     return '';
   }
   $value = trim( $value );
   if ( preg_match( '/^-?[0-9]*\.?[0-9]+(px|em|rem|%|vh|vw|vmin|vmax|pt|pc|ch|ex|cm|mm|in|q)$/i', $value ) ) {
     return $value;
   }
   if ( preg_match( '/^var\(--[a-z0-9\-_]+\)$/i', $value ) ) {
     return $value;
   }
   return '';
 }

 /**
  * Whitelist matcher for CSS color values ( hex, rgb/rgba, hsl/hsla, named
  * colors, `var(--custom-prop[, fallback])` ). Anything else is rejected.
  */
 function etb_sanitize_css_color( $value ) {
   if ( ! is_string( $value ) || '' === $value ) {
     return '';
   }
   $value = trim( $value );
   if ( preg_match( '/^#[0-9a-f]{3,8}$/i', $value ) ) {
     return $value;
   }
   if ( preg_match( '/^(rgb|rgba|hsl|hsla)\(\s*[0-9.\s,%]+\)$/i', $value ) ) {
     return $value;
   }
   if ( preg_match( '/^var\(--[a-z0-9\-_]+(,\s*[a-z0-9#.\s%,]+)?\)$/i', $value ) ) {
     return $value;
   }
   if ( preg_match( '/^[a-z]+$/i', $value ) ) {
     return $value;
   }
   return '';
 }

 /**
  * Whitelist matcher for CSS keyword values ( border-style, text-align, ... ).
  * Returns $default when $value isn't one of the $allowed keywords.
  */
 function etb_sanitize_css_keyword( $value, array $allowed, $default = '' ) {
   return is_string( $value ) && in_array( $value, $allowed, true ) ? $value : $default;
 }

 /**
  * Final safety net applied to the fully-built CSS string right before it is
  * handed to wp_add_inline_style(). Strips anything that could close out an
  * inline <style> tag or embed a null byte, in case an unsanitized value
  * ever slips through the per-declaration sanitizers above.
  */
 function etb_sanitize_inline_css( $css ) {
   $css = (string) $css;
   $css = str_ireplace( array( '</style', '<style', "\0" ), '', $css );
   return $css;
 }

 /**
  * Converts a border radius value (number | string | per-corner object) to CSS.
  */
 function etb_border_radius_css( $value, $default_unit ) {
   if ( ( empty( $value ) && 0 !== $value && '0' !== $value ) ) {
     return '';
   }

   $to_css_value = function( $corner_value ) use ( $default_unit ) {
     if ( is_string( $corner_value ) && 0 === strpos( $corner_value, 'var:preset|border-radius|' ) ) {
       $slug = preg_replace( '/[^a-z0-9\-_]/', '', substr( $corner_value, strlen( 'var:preset|border-radius|' ) ) );
       return 'var(--wp--preset--border-radius--' . $slug . ')';
     }
     if ( is_numeric( $corner_value ) ) {
       return $corner_value . $default_unit;
     }
     return etb_sanitize_css_dimension( $corner_value, $default_unit );
   };

   if ( is_numeric( $value ) || is_string( $value ) ) {
     $radius = $to_css_value( $value );
     return '' === $radius ? '' : 'border-radius: ' . $radius . ';';
   }

   if ( is_array( $value ) ) {
     $corners = array(
       'top-left'     => isset( $value['topLeft'] ) ? $value['topLeft'] : '',
       'top-right'    => isset( $value['topRight'] ) ? $value['topRight'] : '',
       'bottom-right' => isset( $value['bottomRight'] ) ? $value['bottomRight'] : '',
       'bottom-left'  => isset( $value['bottomLeft'] ) ? $value['bottomLeft'] : '',
     );
     $css = '';
     foreach ( $corners as $corner => $corner_value ) {
       if ( '' === $corner_value || null === $corner_value ) {
         continue;
       }
       $radius = $to_css_value( $corner_value );
       if ( '' === $radius ) {
         continue;
       }
       $css .= 'border-' . $corner . '-radius: ' . $radius . ';';
     }
     return $css;
   }

   return '';
 }

 /**
  * Converts a per-side padding object to CSS declarations.
  */
 function etb_padding_css( $value ) {
   if ( ! is_array( $value ) ) {
     return '';
   }
   $sides = array(
     'top'    => isset( $value['top'] ) ? $value['top'] : '',
     'right'  => isset( $value['right'] ) ? $value['right'] : '',
     'bottom' => isset( $value['bottom'] ) ? $value['bottom'] : '',
     'left'   => isset( $value['left'] ) ? $value['left'] : '',
   );
   $css = '';
   foreach ( $sides as $side => $side_value ) {
     if ( '' === $side_value || null === $side_value ) {
       continue;
     }
     $side_value = etb_sanitize_css_dimension( $side_value, 'px' );
     if ( '' === $side_value ) {
       continue;
     }
     $css .= 'padding-' . $side . ': ' . $side_value . ';';
   }
   return $css;
 }

 /**
  * Detects the per-side padding shape written by the core box control.
  */
 function etb_has_box_padding( $value ) {
   return is_array( $value ) && (
     isset( $value['top'] ) ||
     isset( $value['right'] ) ||
     isset( $value['bottom'] ) ||
     isset( $value['left'] )
   );
 }

 /**
  * Font size declaration for string values ( theme presets / custom sizes ).
  */
 function etb_font_size_css( $value ) {
   if ( ! is_string( $value ) || '' === $value ) {
     return '';
   }
   if ( 0 === strpos( $value, 'var:preset|font-size|' ) ) {
     $slug = preg_replace( '/[^a-z0-9\-_]/', '', substr( $value, strlen( 'var:preset|font-size|' ) ) );
     return 'font-size: var(--wp--preset--font-size--' . $slug . ');';
   }
   $value = etb_sanitize_css_dimension( $value, 'px' );
   if ( '' === $value ) {
     return '';
   }
   return 'font-size: ' . $value . ';';
 }

 /**
  * Detects the legacy responsive font size shape ({desktop,tablet,mobile}).
  */
 function etb_has_responsive_size( $value ) {
   return is_array( $value ) && isset( $value['desktop'] );
 }

 /**
  * Per-device font size rule for legacy responsive values.
  */
 function etb_responsive_font_size( $handle, $selector, $value, $device ) {
   if ( ! etb_has_responsive_size( $value ) ) {
     return '';
   }
   $size = isset( $value[ $device ] ) && is_numeric( $value[ $device ] ) ? (float) $value[ $device ] : 0;
   if ( ! $size ) {
     return '';
   }
   return ".$handle $selector{font-size: {$size}px;}";
 }

 function etb_testimonial_grid( $attributes ) {
  // The handle is interpolated unescaped into every CSS selector below, so
  // it's restricted to characters that are safe in both a CSS class name
  // and an HTML id ( no quotes, braces, or other structural characters ).
  $handle = preg_replace( '/[^A-Za-z0-9_-]/', '', (string) $attributes['id'] );

  // default attribute values, guards against old posts with missing keys
  $attributes = wp_parse_args( $attributes, array(
    'gridCols'             => array( 'desktop' => 2, 'tablet' => 2, 'mobile' => 1 ),
    'gridGap'              => array( 'desktop' => 20, 'tablet' => 20, 'mobile' => 15 ),
    'iconSizes'            => array( 'desktop' => 60, 'tablet' => 48, 'mobile' => 36 ),
    'ttmFontSizes'         => array( 'desktop' => 20, 'tablet' => 18, 'mobile' => 16 ),
    'photoSizes'           => array( 'desktop' => 60, 'tablet' => 48, 'mobile' => 36 ),
    'nameFontSizes'        => array( 'desktop' => 24, 'tablet' => 20, 'mobile' => 18 ),
    'titleFontSizes'       => array( 'desktop' => 18, 'tablet' => 16, 'mobile' => 14 ),
    'companyFontSizes'     => array( 'desktop' => 16, 'tablet' => 15, 'mobile' => 14 ),
    'containerPadding'     => array( 'desktop' => 20, 'tablet' => 20, 'mobile' => 15 ),
    'containerBorder'      => array( 'width' => 0, 'style' => 'solid', 'color' => '' ),
    'containerBorderRadius' => 5,
    'photoBorder'          => array( 'width' => '1px', 'style' => 'solid', 'color' => '#c0c0c0' ),
    'photoBorderRadius'    => 50,
    'ttmAlign'             => 'left',
    'infoAlign'            => 'flex-start',
    'iconOpacity'          => 0.4,
  ) );

  $css ='';

  // grid
  if ( isset( $attributes['zIndex'] ) && is_numeric( $attributes['zIndex'] ) ) {
    $css .= ".$handle.wp-block-etb-grid{";
      $css .= 'z-index: ' . intval( $attributes['zIndex'] ) . ';';
    $css .= "}";
  }

  $css .= ".$handle .wp-block-etb-grid-item{";
    if ( ! empty( $attributes['containerBg'] ) ) {
      $bg = etb_sanitize_css_color( $attributes['containerBg'] );
      if ( $bg ) {
        $css .= "background: {$bg};";
      }
    }
    $css .= etb_border_radius_css( $attributes['containerBorderRadius'], 'px' );
    if ( etb_has_box_padding( $attributes['containerPadding'] ) ) {
      $css .= etb_padding_css( $attributes['containerPadding'] );
    }
    $border_width = isset( $attributes['containerBorder']['width'] ) ? $attributes['containerBorder']['width'] : '';
    if ( '' !== $border_width && 0 !== $border_width && '0' !== $border_width && '0px' !== $border_width ) {
      $border_width = etb_sanitize_css_dimension( $border_width, 'px' );
      if ( $border_width ) {
        $border_style = etb_sanitize_css_keyword(
          isset( $attributes['containerBorder']['style'] ) ? $attributes['containerBorder']['style'] : 'solid',
          array( 'solid', 'dashed', 'dotted', 'double', 'groove', 'ridge', 'inset', 'outset', 'none', 'hidden' ),
          'solid'
        );
        $border_color = isset( $attributes['containerBorder']['color'] ) ? etb_sanitize_css_color( $attributes['containerBorder']['color'] ) : '';
        $css .= "border: {$border_width} {$border_style} {$border_color};";
      }
    }
  $css .= "}";

  // testimonial quote icon + rating
  $css .= ".$handle .quote-icon svg{";
    if ( ! empty( $attributes['iconColor'] ) ) {
      $icon_color = etb_sanitize_css_color( $attributes['iconColor'] );
      if ( $icon_color ) {
        $css .= "fill: {$icon_color};";
      }
    }

    $opacity = is_numeric( $attributes['iconOpacity'] ) ? min( 1, max( 0, (float) $attributes['iconOpacity'] ) ) : 1;
    $css .= "opacity: {$opacity};";
  $css .= "}";

  $css .= ".$handle .rating{";
    if ( ! empty( $attributes['ratingColor'] ) ) {
      $rating_color = etb_sanitize_css_color( $attributes['ratingColor'] );
      if ( $rating_color ) {
        $css .= "color: {$rating_color};";
      }
    }
  $css .= "}";

  $css .= ".$handle .gutenlayout-star-rating svg{";
    if ( ! empty( $attributes['ratingColor'] ) ) {
      $rating_color = etb_sanitize_css_color( $attributes['ratingColor'] );
      if ( $rating_color ) {
        $css .= "fill: {$rating_color};";
      }
    }
  $css .= "}";

  // testimonial message
  $css .= ".$handle .testimonial-message{";
    $css .= etb_font_size_css( $attributes['ttmFontSizes'] );
    if ( ! empty( $attributes['ttmFontColor'] ) ) {
      $ttm_color = etb_sanitize_css_color( $attributes['ttmFontColor'] );
      if ( $ttm_color ) {
        $css .= "color: {$ttm_color};";
      }
    }
    $ttm_align = etb_sanitize_css_keyword( $attributes['ttmAlign'], array( 'left', 'right', 'center', 'justify' ), 'left' );
    $css .= "text-align: {$ttm_align};";
  $css .= "}";

  // reviewer info
  $css .= ".$handle .reviewer-info{";
    $info_align = etb_sanitize_css_keyword(
      $attributes['infoAlign'],
      array( 'flex-start', 'flex-end', 'center', 'space-between', 'space-around', 'space-evenly', 'normal', 'stretch' ),
      'flex-start'
    );
    $css .= "justify-content: {$info_align};";
  $css .= "}";



  // reviewer photo
  $css .= ".$handle .reviewer-photo{";
    $css .= etb_border_radius_css( $attributes['photoBorderRadius'], '%' );
    if ( $attributes['photoBorder']['width'] !== '0px' ) {
      $photo_border_width = etb_sanitize_css_dimension( $attributes['photoBorder']['width'], 'px' );
      if ( $photo_border_width ) {
        $borderType  = etb_sanitize_css_keyword(
          isset( $attributes['photoBorder']['style'] ) ? $attributes['photoBorder']['style'] : 'solid',
          array( 'solid', 'dashed', 'dotted', 'double', 'groove', 'ridge', 'inset', 'outset', 'none', 'hidden' ),
          'solid'
        );
        $borderColor = isset( $attributes['photoBorder']['color'] ) ? etb_sanitize_css_color( $attributes['photoBorder']['color'] ) : '';
        if ( ! $borderColor ) {
          $borderColor = '#fa0';
        }
        $css .= "border: {$photo_border_width} {$borderType} {$borderColor} ;";
      }
    }
  $css .= "}";

    // reviewer info
    $css .= ".$handle .reviewer-name{";
      $css .= etb_font_size_css( $attributes['nameFontSizes'] );
      if ( ! empty( $attributes['nameFontColor'] ) ) {
        $name_color = etb_sanitize_css_color( $attributes['nameFontColor'] );
        if ( $name_color ) {
          $css .= "color: {$name_color};";
        }
      }
    $css .= "}";

    $css .= ".$handle .reviewer-title{";
      $css .= etb_font_size_css( $attributes['titleFontSizes'] );
      if ( ! empty( $attributes['titleFontColor'] ) ) {
        $title_color = etb_sanitize_css_color( $attributes['titleFontColor'] );
        if ( $title_color ) {
          $css .= "color: {$title_color};";
        }
      }
    $css .= "}";

    $css .= ".$handle .reviewer-company{";
      $css .= etb_font_size_css( $attributes['companyFontSizes'] );
      if ( ! empty( $attributes['companyFontColor'] ) ) {
        $company_color = etb_sanitize_css_color( $attributes['companyFontColor'] );
        if ( $company_color ) {
          $css .= "color: {$company_color};";
        }
      }
    $css .= "}";

  // Desktop
  $css .= "@media (min-width: 1025px) {";
    // grid
    $css .= ".$handle.wp-block-etb-grid{";
      $css .= 'grid-template-columns: repeat(' . absint( $attributes['gridCols']['desktop'] ) . ', 1fr);';
      $css .= 'grid-gap: ' . absint( $attributes['gridGap']['desktop'] ) . 'px;';
    $css .= "}";

    if ( ! etb_has_box_padding( $attributes['containerPadding'] ) && isset( $attributes['containerPadding']['desktop'] ) ) {
      $css .= ".$handle .wp-block-etb-grid-item{";
        $css .= 'padding: ' . absint( $attributes['containerPadding']['desktop'] ) . 'px;';
      $css .= "}";
    }

    $css .= ".$handle .quote-icon svg{";
      $css .= 'width: ' . absint( $attributes['iconSizes']['desktop'] ) . 'px;';
    $css .= "}";

    $css .= etb_responsive_font_size( $handle, '.testimonial-message', $attributes['ttmFontSizes'], 'desktop' );

    $css .= ".$handle .reviewer-photo{";
      $css .= 'width: ' . absint( $attributes['photoSizes']['desktop'] ) . 'px;';
      $css .= 'height: ' . absint( $attributes['photoSizes']['desktop'] ) . 'px;';
    $css .= "}";

    $css .= etb_responsive_font_size( $handle, '.reviewer-name', $attributes['nameFontSizes'], 'desktop' );
    $css .= etb_responsive_font_size( $handle, '.reviewer-title', $attributes['titleFontSizes'], 'desktop' );
    $css .= etb_responsive_font_size( $handle, '.reviewer-company', $attributes['companyFontSizes'], 'desktop' );

  $css .= "}";

  // Tablet
  $css .= "@media (min-width: 768px) and (max-width: 1024px) {";
    // grid
    $css .= ".$handle.wp-block-etb-grid{";
      $css .= 'grid-template-columns: repeat(' . absint( $attributes['gridCols']['tablet'] ) . ', 1fr);';
      $css .= 'grid-gap: ' . absint( $attributes['gridGap']['tablet'] ) . 'px;';
    $css .= "}";

    if ( ! etb_has_box_padding( $attributes['containerPadding'] ) && isset( $attributes['containerPadding']['tablet'] ) ) {
      $css .= ".$handle .wp-block-etb-grid-item{";
        $css .= 'padding: ' . absint( $attributes['containerPadding']['tablet'] ) . 'px;';
      $css .= "}";
    }

    $css .= ".$handle .quote-icon svg{";
      $css .= 'width: ' . absint( $attributes['iconSizes']['tablet'] ) . 'px;';
    $css .= "}";

    $css .= etb_responsive_font_size( $handle, '.testimonial-message', $attributes['ttmFontSizes'], 'tablet' );

    $css .= ".$handle .reviewer-photo{";
      $css .= 'width: ' . absint( $attributes['photoSizes']['tablet'] ) . 'px;';
      $css .= 'height: ' . absint( $attributes['photoSizes']['tablet'] ) . 'px;';
    $css .= "}";

    $css .= etb_responsive_font_size( $handle, '.reviewer-name', $attributes['nameFontSizes'], 'tablet' );
    $css .= etb_responsive_font_size( $handle, '.reviewer-title', $attributes['titleFontSizes'], 'tablet' );
    $css .= etb_responsive_font_size( $handle, '.reviewer-company', $attributes['companyFontSizes'], 'tablet' );

  $css .= "}";

  // Mobile
  $css .= "@media (max-width: 767px) {";
    // grid
    $css .= ".$handle.wp-block-etb-grid{";
      $css .= 'grid-template-columns: repeat(' . absint( $attributes['gridCols']['mobile'] ) . ', 1fr);';
      $css .= 'grid-gap: ' . absint( $attributes['gridGap']['mobile'] ) . 'px;';
    $css .= "}";

    if ( ! etb_has_box_padding( $attributes['containerPadding'] ) && isset( $attributes['containerPadding']['mobile'] ) ) {
      $css .= ".$handle .wp-block-etb-grid-item{";
        $css .= 'padding: ' . absint( $attributes['containerPadding']['mobile'] ) . 'px;';
      $css .= "}";
    }

    $css .= ".$handle .quote-icon svg{";
      $css .= 'width: ' . absint( $attributes['iconSizes']['mobile'] ) . 'px;';
    $css .= "}";

    $css .= etb_responsive_font_size( $handle, '.testimonial-message', $attributes['ttmFontSizes'], 'mobile' );

    $css .= ".$handle .reviewer-photo{";
      $css .= 'width: ' . absint( $attributes['photoSizes']['mobile'] ) . 'px;';
      $css .= 'height: ' . absint( $attributes['photoSizes']['mobile'] ) . 'px;';
    $css .= "}";

    $css .= etb_responsive_font_size( $handle, '.reviewer-name', $attributes['nameFontSizes'], 'mobile' );
    $css .= etb_responsive_font_size( $handle, '.reviewer-title', $attributes['titleFontSizes'], 'mobile' );
    $css .= etb_responsive_font_size( $handle, '.reviewer-company', $attributes['companyFontSizes'], 'mobile' );

  $css .= "}";

   return $css; 
 }