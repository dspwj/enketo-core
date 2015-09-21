if ( typeof exports === 'object' && typeof exports.nodeName !== 'string' && typeof define !== 'function' ) {
    var define = function( factory ) {
        factory( require, exports, module );
    };
}
/**
 * @preserve Copyright 2012 Martijn van de Rijdt & Modilabs
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

define( function( require, exports, module ) {
    'use strict';
    var Widget = require( '../../js/Widget' );
    var $ = require( 'jquery' );
    var pluginName = 'scroll';

    /**
     * @constructor
     * @param {Element} element [description]
     * @param {(boolean|{touch: boolean, repeat: boolean})} options options
     * @param {*=} e     event
     */
    function Scroll( element, options ) {
        this.namespace = pluginName;
        Widget.call( this, element, options );
        this._init();
    }

    Scroll.prototype = Object.create( Widget.prototype );

    Scroll.prototype.constructor = Scroll;

    Scroll.prototype._init = function() {

        this.$formTitle = $( this.element ).find( '#form-title' );
        this.$scrollButton = $( '<button type="button" class="btn btn-icon-only btn-scroll-to-first">' +
            '<i class="fa fa-chevron-down"></i></button>' );

        this.$formTitle
            .after( this.$scrollButton );

        this._setScrollHandler();
    };

    Scroll.prototype._setScrollHandler = function() {
        this.$scrollButton.add( this.$formTitle ).on( 'click', function() {
            if ( window.scrollTo ) {
                var firstTop = $( '.question' ).eq( 0 ).offset().top;
                window.scrollTo( 0, firstTop - 20 );
            }
            return false;
        } );
    };

    Scroll.prototype.destroy = function( element ) {};

    $.fn[ pluginName ] = function( options, event ) {
        return this.each( function() {
            var $this = $( this ),
                data = $this.data( pluginName );

            options = options || {};

            if ( !data && typeof options === 'object' ) {
                $this.data( pluginName, ( data = new Scroll( this, options, event ) ) );
            } else if ( data && typeof options === 'string' ) {
                data[ options ]( this );
            }
        } );
    };

    module.exports = {
        'name': pluginName,
        'selector': 'form'
    };
} );
