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
    require( '../../js/plugins' );

    var pluginName = 'selectPickerUngaCollapse';

    /**
     * @constructor
     * @param {Element} element [description]
     * @param {(boolean|{touch: boolean, repeat: boolean})} options options
     * @param {*=} e     event
     */
    function SelectPickerUngaCollapse( element, options ) {
        this.namespace = pluginName;
        Widget.call( this, element, options );
        this._init();
    }

    //copy the prototype functions from the Widget super class
    SelectPickerUngaCollapse.prototype = Object.create( Widget.prototype );

    //ensure the constructor is the new one
    SelectPickerUngaCollapse.prototype.constructor = SelectPickerUngaCollapse;

    SelectPickerUngaCollapse.prototype._init = function() {
        var $labelEl = $( this.element ).siblings( '.option-label.active' );
        var labels = $labelEl.html().split( /\|/ ).map( function( label ) {
            return label.trim();
        } );

        this.$collapseButton = $( '<button class="btn-collapse btn-icon-only"><i class="icon"> </i></button>' );
        this.$collapsible = $( '<span class="sub-option-label collapsible">' + labels[ 1 ] + '</span>' );

        $labelEl.html( labels[ 0 ] )
            .after( this.$collapsible );

        $labelEl.append( this.$collapseButton );

        this._setButtonHandler();
    };

    SelectPickerUngaCollapse.prototype._renderLabels = function() {
        // reserved in case translations need to be supported..
    };

    SelectPickerUngaCollapse.prototype._setButtonHandler = function() {
        var that = $( this.element ).siblings( '.option-label.active' );
        that.on( 'click', function() {
            var open = that.hasClass( 'open' );
            that.toggleClass( 'open', !open );
            return false;
        } );
    };

    SelectPickerUngaCollapse.prototype.destroy = function( element ) {};

    $.fn[ pluginName ] = function( options, event ) {
        return this.each( function() {
            var $this = $( this ),
                data = $this.data( pluginName );

            options = options || {};

            if ( !data && typeof options === 'object' ) {
                $this.data( pluginName, ( data = new SelectPickerUngaCollapse( this, options, event ) ) );
            } else if ( data && typeof options === 'string' ) {
                data[ options ]( this );
            }
        } );
    };

    module.exports = {
        'name': pluginName,
        'selector': '.or-appearance-unga-collapse input[type="checkbox"]'
    };
} );
