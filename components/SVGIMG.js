import React from 'react';


const SVGIMG = React.createClass({
 render() {
   const SvgSrc = this.props.src;

   return (
     <div dangerouslySetInnerHTML={{ __html: SvgSrc  }} />
   )
 }
})

export default SVGIMG
