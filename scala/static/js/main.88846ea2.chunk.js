(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{12:function(t,e,a){t.exports=a(19)},18:function(t,e,a){},19:function(t,e,a){"use strict";a.r(e);var r=a(0),n=a.n(r),i=a(11),s=a.n(i),o=(a(18),a(4)),l=a(5),c=a(8),d=a(6),u=a(7),p=a(3),h=[{label:"start",testLabel:"Part 1",text:"The function \\(\\mathtt{\\color{blue}{f(x)=x}}\\) is the basic function for the linear function family. A basic function is the simplest function of its type. The basic linear function \\(\\mathtt{\\color{blue}{f(x)=x}}\\) goes through the origin and has a slope of \\(\\mathtt{1}\\).",test:"Click on the two points that must be on the graph of the function \\(\\mathtt{\\color{blue}{f(x)=x}}\\), which is the basic function for the linear function family. Remember, the basic linear function has a slope of \\(\\mathtt{1}\\) and goes through the origin.",id:"1",order:1},{label:"step 1",testLabel:"Part 2",text:"You can translate the graph of \\(\\mathtt{\\color{blue}{f(x)}}\\) down \\(\\mathtt{\\color{#ff2a5a}{5}}\\) units by moving each point \\(\\mathtt{\\color{#ff2a5a}{5}}\\) units down. The translated graph is labeled as \\(\\mathtt{\\color{purple}{m(x)}}\\).",test:"Drag the basic function \\(\\mathtt{\\color{blue}{f(x)=x}}\\) down \\(\\mathtt{\\color{red}{3}}\\) units to translate the basic function. The translated graph is labeled as \\(\\mathtt{\\color{purple}{m(x)}}\\).",id:"2",order:2},{label:"step 2",testLabel:"Part 3",text:"To translate the point \\(\\mathtt{\\color{#349946}{(-2,-2)}}\\) on \\(\\mathtt{\\color{blue}{f(x)}}\\), subtract \\(\\mathtt{\\color{#ff2a5a}{5}}\\) units from the output value, or \\(\\mathtt{\\color{#349946}{y}}\\)-value. The input value, or \\(\\mathtt{\\color{#349946}{x}}\\)-value, stays the same.",test:"Drag to translate the point at \\(\\mathtt{\\color{#349946}{(-3,-3)}}\\) down \\(\\mathtt{\\color{red}{3}}\\) units.",id:"3",order:3},{label:"end",testLabel:"Part 4",text:"Because \\(\\mathtt{\\color{#349946}{-2\\,}}\\)\\(\\mathtt{\\color{#ff2a5a}{-\\,5\\,}}\\)\\(\\mathtt{=-7}\\), the coordinates of the translated point on \\(\\mathtt{\\color{purple}{m(x)}}\\) are \\(\\mathtt{\\color{#349946}{(-2,-7)}}\\).",test:"You translated the point at \\(\\mathtt{\\color{#349946}{(-3,-3)}}\\) on \\(\\mathtt{\\color{blue}{f(x)}}\\) down \\(\\mathtt{\\color{red}{3}}\\) units. Now, enter the coordinates of the translated point.",id:"4",order:4}],y=a(2),m=a.n(y),b=function(t){function e(){var t;return Object(o.a)(this,e),(t=Object(c.a)(this,Object(d.a)(e).call(this))).state={},t}return Object(u.a)(e,t),Object(l.a)(e,[{key:"componentDidMount",value:function(){m()("#steptext".concat(this.props.order)).html(this.props.text)}},{key:"render",value:function(){var t,e,a;return"learn"===this.props.curmode?(this.props.order<this.props.curbut?(t={pointerEvents:"none",opacity:1},e={backgroundColor:"#1e87f0"}):this.props.order===this.props.curbut?(t={pointerEvents:"all",opacity:.5},e={backgroundColor:"gray"}):(t={pointerEvents:"none",opacity:.5},e={backgroundColor:"gray"}),a=this.props.order===this.props.curbut-1&&this.props.curbut>1?{visibility:"visible",cursor:"pointer",pointerEvents:"all"}:{visibility:"hidden",cursor:"none",pointerEvents:"none"}):(a={visibility:"hidden",cursor:"none",pointerEvents:"none"},this.props.order>this.props.curmark?(t={pointerEvents:"none",opacity:.5},e={backgroundColor:"gray"}):(t={pointerEvents:"none",opacity:1},e={backgroundColor:"#1e87f0"})),n.a.createElement("div",{className:"uk-card uk-card-default uk-card-body uk-card-small uk-width-1-1@m uk-margin-small-bottom",id:"card".concat(this.props.order),onClick:this.props.handler,style:t},n.a.createElement("div",null,n.a.createElement("span",{className:"arrow",onClick:this.props.upone,style:a},"\u2191"),n.a.createElement("span",{className:"uk-label",style:e},this.props.label)," ",n.a.createElement("p",{className:"step-text",id:"steptext".concat(this.props.order)},this.props.text)))}}]),e}(r.Component),k=a(1),f=a(9),v=a.n(f),g=function(t){function e(){var t;return Object(o.a)(this,e),(t=Object(c.a)(this,Object(d.a)(e).call(this))).state={part1clicks:0,part1pnts:[]},t.clickPart1=t.clickPart1.bind(Object(p.a)(t)),t.handleAnswer1=t.handleAnswer1.bind(Object(p.a)(t)),t.handleAnswer2=t.handleAnswer2.bind(Object(p.a)(t)),t.handleAnswer3=t.handleAnswer3.bind(Object(p.a)(t)),t.handleAnswer4=t.handleAnswer4.bind(Object(p.a)(t)),t}return Object(u.a)(e,t),Object(l.a)(e,[{key:"componentDidMount",value:function(){this.drawSVG()}},{key:"clickPart1",value:function(t){var e=this.state.part1pnts,a=k.b("#circle"+t.id).style("fill");if(this.state.part1clicks<2&&"black"===a)k.b("#circle"+t.id).style("fill","green"),e.push(t.id),this.setState({part1clicks:this.state.part1clicks+1,part1pnts:e});else if(this.state.part1clicks<2&&"green"===a){k.b("#circle"+t.id).style("fill","black");var r=e.indexOf(t.id);e.splice(r,1),this.setState({part1clicks:this.state.part1clicks-1,part1pnts:e})}2===this.props.curbut&&2===this.state.part1clicks&&(k.c(".clckpnt").style("pointer-events","none"),this.handleAnswer1())}},{key:"dragFXLine",value:function(t){k.b("#dragBut1").style("opacity",.2);var e=document.getElementById("fxLine"),a=t.target,r=(parseFloat(a.getAttribute("data-y"))||0)+t.dy,n=(parseFloat(e.getAttribute("data-y"))||0)+t.dy;a.style.webkitTransform=a.style.transform="translate(0px, "+r+"px)",e.style.webkitTransform=e.style.transform="translate(0px, "+n+"px)",a.setAttribute("data-y",r),e.setAttribute("data-y",n),k.b("#trackLine1").attr("y2",Number(k.b("#trackLine1").attr("y2"))+t.dy),k.b("#trackLine2").attr("y2",Number(k.b("#trackLine2").attr("y2"))+t.dy)}},{key:"dragCircle",value:function(t){k.b("#dragBut2").style("opacity",.2);var e=document.getElementById("dragCircle"),a=t.target,r=(parseFloat(a.getAttribute("data-y"))||0)+t.dy,n=(parseFloat(e.getAttribute("data-y"))||0)+t.dy;a.style.webkitTransform=a.style.transform="translate(0px, "+r+"px)",e.style.webkitTransform=e.style.transform="translate(0px, "+n+"px)",a.setAttribute("data-y",r),e.setAttribute("data-y",n),k.b("#trackLine3").attr("y2",Number(k.b("#trackLine3").attr("y2"))+t.dy)}},{key:"handleAnswer4",value:function(){var t=m()("#x-coord").val(),e=m()("#y-coord").val();"none"!==t&&"none"!==e&&("-3"===t&&"-6"===e?(this.props.correctans(),setTimeout(function(){k.b(".coord-pair").remove()},500),k.b("#coordText").transition().delay(500).duration(1e3).style("opacity",1)):k.c(".coord-input").style("border","1px solid red"))}},{key:"handleAnswer3",value:function(){var t=Number(k.b("#dragCircle").attr("data-y"));k.b("#dragBut2").style("opacity",.8),t>=58&&t<=62&&(m()(".coord-pair").offset({left:m()("#dragCircle").offset().left+10,top:m()("#dragCircle").offset().top}),k.b("#dragBut2").remove(),this.props.correctans(),k.b(".coord-pair").transition().duration(1e3).style("opacity",1),m()("#x-coord").focus(),window.addEventListener("resize",function(){null!==m()(".coord-pair")&&m()(".coord-pair").offset({left:m()("#dragCircle").offset().left+10,top:m()("#dragCircle").offset().top})}))}},{key:"handleAnswer2",value:function(){var t=Number(k.b("#fxLine").attr("data-y"));if(k.b("#dragBut1").style("opacity",.8),t>=58&&t<=62){k.b("#dragBut1").remove(),k.b("#fxLine").style("stroke","#a22aff").style("stroke-dasharray","5 10");var e=k.c(".clckpnt")._groups[0].length;k.b("#mxText").transition().delay(200*e).duration(1e3).style("opacity",1),k.c(".clckpnt").transition().delay(function(t,e){return 200*e}).duration(500).attr("r",20).style("opacity",0).style("fill","none").style("stroke","red"),this.props.correctans(),setTimeout(function(){k.c(".clckpnt").remove()},200*e),k.b("#interactive").select("svg").append("line").attr("id","trackLine3").attr("x1",260).attr("y1",260).attr("x2",260).attr("y2",260).style("stroke","red").style("stroke-width",1.5),k.b("#interactive").select("svg").append("circle").attr("cx",260).attr("cy",260).attr("r",9).style("fill","green").style("opacity",0).transition().delay(200*e).duration(1e3).style("opacity",.5),k.b("#interactive").select("svg").append("circle").attr("id","dragCircle").attr("cx",260).attr("cy",260).attr("r",9).style("fill","green").style("opacity",0),k.b("#interactive").select("svg").append("text").attr("id","dragPointText").attr("x",170).attr("y",250).style("fill","green").style("opacity",0).text("(\u20133, \u20133)"),k.b("#dragCircle").transition().delay(200*e+500).duration(1e3).style("opacity",1),k.b("#dragPointText").transition().delay(200*e+500).duration(1e3).style("opacity",1),k.b("#interactive").select("svg").append("svg:image").attr("id","dragBut2").attr("xlink:href","dragbutton.png").attr("width",40).attr("height",40).attr("x",245).attr("y",270).style("opacity",0).style("cursor","pointer").transition().delay(2800).duration(500).style("opacity",.8),v()("#dragBut2").draggable({origin:"parent",axis:"y",onmove:this.dragCircle,onend:this.handleAnswer3})}}},{key:"handleAnswer1",value:function(){if(-1!==this.state.part1pnts.indexOf("3")&&-1!==this.state.part1pnts.indexOf("4"))this.props.correctans(),k.b("#interactive").select("svg").append("line").attr("id","trackLine1").attr("x1",400).attr("y1",120).attr("x2",400).attr("y2",120).style("stroke","red").style("stroke-width",1.5),k.b("#interactive").select("svg").append("line").attr("id","trackLine2").attr("x1",240).attr("y1",280).attr("x2",240).attr("y2",280).style("stroke","red").style("stroke-width",1.5),k.b("#interactive").select("svg").append("line").attr("x1",-120).attr("y1",640).attr("x2",-120).attr("y2",640).style("stroke","blue").style("stroke-width",5).style("stroke-linecap","round").transition().duration(1e3).ease(k.a).attr("x2",760).attr("y2",-240),k.b("#interactive").select("svg").append("line").attr("id","fxLine").attr("x1",-120).attr("y1",640).attr("x2",-120).attr("y2",640).style("stroke","blue").style("stroke-width",5).style("stroke-linecap","round").transition().duration(1e3).ease(k.a).attr("x2",760).attr("y2",-240),k.b("#fxText").transition().delay(800).duration(1e3).style("opacity",1),k.b("#interactive").select("svg").append("svg:image").attr("id","dragBut1").attr("xlink:href","dragbutton.png").attr("width",40).attr("height",40).attr("x",380).attr("y",120).style("opacity",0).style("cursor","pointer").transition().delay(1e3).duration(500).style("opacity",.8),v()("#dragBut1").draggable({origin:"parent",axis:"y",onmove:this.dragFXLine,onend:this.handleAnswer2});else{var t="3"!==this.state.part1pnts[0]&&"4"!==this.state.part1pnts[0],e="3"!==this.state.part1pnts[1]&&"4"!==this.state.part1pnts[1],a=k.b("#circle".concat(this.state.part1pnts[0])),r=k.b("#circle".concat(this.state.part1pnts[1]));setTimeout(function(){t&&(a.transition().duration(500).attr("r",20).style("opacity",0).style("fill","none").style("stroke","red"),setTimeout(function(){a.remove()},750)),e&&(r.transition().delay(200).duration(500).attr("r",20).style("opacity",0).style("fill","none").style("stroke","red"),setTimeout(function(){r.remove()},750)),k.c(".clckpnt").style("pointer-events","all").style("fill","black")},500),this.setState({part1clicks:0,part1pnts:[]})}}},{key:"drawSVG",value:function(){for(var t=m()("#media-container").width(),e=m()("#media-container").height(),a=k.b("#interactive").append("svg").attr("width",t).attr("height",e).attr("viewBox","0 0 644 393.5").attr("preserveAspectRatio","xMidYMid"),r=20;r<624;r+=20)a.append("line").attr("x1",r).attr("y1",0).attr("x2",r).attr("y2",393.5).style("stroke","#36a9e1").style("stroke-width",.9);for(var n=20;n<393.5;n+=20)a.append("line").attr("x1",0).attr("y1",n).attr("x2",644).attr("y2",n).style("stroke","#36a9e1").style("stroke-width",.9);a.append("line").attr("x1",320).attr("y1",0).attr("x2",320).attr("y2",393.5).style("stroke","black").style("stroke-width",2),a.append("line").attr("x1",0).attr("y1",200).attr("x2",644).attr("y2",200).style("stroke","black").style("stroke-width",2),a.selectAll("circle").data([{x:40,y:100,id:"1"},{x:320,y:340,id:"2"},{x:260,y:260,id:"3"},{x:360,y:160,id:"4"},{x:500,y:200,id:"5"},{x:500,y:80,id:"6"},{x:600,y:360,id:"7"},{x:120,y:340,id:"8"},{x:240,y:120,id:"9"},{x:400,y:280,id:"10"}]).enter().append("circle").attr("class","clckpnt").attr("id",function(t){return"circle".concat(t.id)}).attr("cx",function(t){return t.x}).attr("cy",function(t){return t.y}).attr("r",9).style("fill","black").on("click",this.clickPart1),a.append("text").attr("id","fxText").attr("x",400).attr("y",25).text("f(x) = x").style("fill","blue").style("stroke","none").style("opacity",0),a.append("text").attr("id","mxText").attr("x",550).attr("y",55).text("m(x)").style("fill","#a22aff").style("stroke","none").style("opacity",0),a.append("text").attr("id","coordText").attr("x",280).attr("y",330).text("(\u20133, \u20136)").style("fill","green").style("stroke","none").style("opacity",0)}},{key:"render",value:function(){return n.a.createElement("div",null,n.a.createElement("div",{className:"coord-pair"},n.a.createElement("span",{style:{fontSize:"1.4em"}},"(\u2009"),n.a.createElement("select",{name:"ddown1",onChange:this.handleAnswer4,className:"coord-input",id:"x-coord"},n.a.createElement("option",{value:"none"}),n.a.createElement("option",{value:"-6"},"\u20136"),n.a.createElement("option",{value:"-5"},"\u20135"),n.a.createElement("option",{value:"-4"},"\u20134"),n.a.createElement("option",{value:"-3"},"\u20133"),n.a.createElement("option",{value:"-2"},"\u20132"),n.a.createElement("option",{value:"-1"},"\u20131")),"\xa0,\xa0",n.a.createElement("select",{name:"ddown2",onChange:this.handleAnswer4,className:"coord-input",id:"y-coord"},n.a.createElement("option",{value:"none"}),n.a.createElement("option",{value:"-6"},"\u20136"),n.a.createElement("option",{value:"-5"},"\u20135"),n.a.createElement("option",{value:"-4"},"\u20134"),n.a.createElement("option",{value:"-3"},"\u20133"),n.a.createElement("option",{value:"-2"},"\u20132"),n.a.createElement("option",{value:"-1"},"\u20131")),n.a.createElement("span",{style:{fontSize:"1.4em"}},"\u2009)")),n.a.createElement("div",{id:"interactive"}))}}]),e}(r.Component),x=function(t){function e(){var t;return Object(o.a)(this,e),(t=Object(c.a)(this,Object(d.a)(e).call(this))).state={currentButton:2,mode:"learn",currentAnswerMark:1,mediaDimTag:"",cardLocs:[]},t.childClick=t.childClick.bind(Object(p.a)(t)),t.startOver=t.startOver.bind(Object(p.a)(t)),t.reset=t.reset.bind(Object(p.a)(t)),t.upOne=t.upOne.bind(Object(p.a)(t)),t.testMode=t.testMode.bind(Object(p.a)(t)),t.learnMode=t.learnMode.bind(Object(p.a)(t)),t.correctAnswer=t.correctAnswer.bind(Object(p.a)(t)),t}return Object(u.a)(e,t),Object(l.a)(e,[{key:"updateMedia",value:function(){var t;t=m()("#media-container").width()/m()("#media-container").height()<=1.2?"_square":"",this.setState({currentButton:this.state.currentButton,mode:this.state.mode,currentAnswerMark:this.state.currentAnswerMark,mediaDimTag:t})}},{key:"componentDidMount",value:function(){this.updateMedia(),window.addEventListener("resize",this.updateMedia.bind(this))}},{key:"componentWillUnmount",value:function(){this.state.intervalIsSet&&(clearInterval(this.state.intervalIsSet),this.setState({intervalIsSet:null}))}},{key:"childClick",value:function(){this.setState({currentButton:this.state.currentButton+1,mode:this.state.mode,currentAnswerMark:this.state.currentAnswerMark,mediaDimTag:this.state.mediaDimTag})}},{key:"correctAnswer",value:function(){this.setState({currentButton:this.state.currentButton,mode:this.state.mode,currentAnswerMark:this.state.currentAnswerMark+1,mediaDimTag:this.state.mediaDimTag});var t=document.getElementById("steps-container"),e=document.getElementById("steps-container").offsetTop,a=document.getElementById("card".concat(this.state.currentAnswerMark)).offsetTop;t.scroll({top:a-e,behavior:"smooth"})}},{key:"startOver",value:function(){this.setState({currentButton:2,mode:this.state.mode,currentAnswerMark:this.state.currentAnswerMark,mediaDimTag:this.state.mediaDimTag}),document.getElementById("steps-container").scroll({top:0,behavior:"smooth"})}},{key:"reset",value:function(){this.setState({currentButton:1,mode:this.state.mode,currentAnswerMark:this.state.currentAnswerMark,mediaDimTag:this.state.mediaDimTag}),document.getElementById("steps-container").scroll({top:0,behavior:"smooth"})}},{key:"upOne",value:function(t){t.stopPropagation(),this.setState({currentButton:this.state.currentButton-1,mode:this.state.mode,currentAnswerMark:this.state.currentAnswerMark,mediaDimTag:this.state.mediaDimTag})}},{key:"testMode",value:function(){this.setState({currentButton:2,mode:"test",currentAnswerMark:1,mediaDimTag:this.state.mediaDimTag}),setTimeout(function(){window.MathJax.Hub.Queue(["Typeset",window.MathJax.Hub])},50),document.getElementById("steps-container").scroll({top:0,behavior:"smooth"})}},{key:"learnMode",value:function(){this.setState({currentButton:2,mode:"learn",currentAnswerMark:1,mediaDimTag:this.state.mediaDimTag}),setTimeout(function(){window.MathJax.Hub.Queue(["Typeset",window.MathJax.Hub])},50),document.getElementById("steps-container").scroll({top:0,behavior:"smooth"}),v()("#dragBut1").unset(),v()("#dragBut2").unset()}},{key:"render",value:function(){var t,e,a,r,i=[];if(r="learn"===this.state.mode?{height:"54vh"}:{minHeight:"54vh"},"learn"===this.state.mode){a=n.a.createElement("span",null,n.a.createElement("button",{onClick:this.startOver,className:"uk-button uk-button-default uk-button-small uk-width-1-3",style:e},"redo"),n.a.createElement("button",{onClick:this.reset,className:"uk-button uk-button-secondary uk-button-small uk-width-1-3"},"clear"),n.a.createElement("button",{onClick:this.testMode,className:"uk-button uk-button-danger uk-button-small uk-width-1-3"},"test \xa0",n.a.createElement("span",{"uk-icon":"star",style:{verticalAlign:3}})));for(var s=0;s<h.length;s++)i.push(n.a.createElement(b,{key:h[s].id,label:h[s].label,text:h[s].text,order:h[s].order,handler:this.childClick,curbut:this.state.currentButton,curmode:this.state.mode,upone:this.upOne}));e=this.state.currentButton<=h.length?{pointerEvents:"none",opacity:.5}:{pointerEvents:"all",opacity:1},t=n.a.createElement("img",{src:1!==this.state.currentButton?"sbs_func".concat(String(this.state.currentButton-1)).concat(this.state.mediaDimTag,".svg"):"",alt:""})}else{a=n.a.createElement("span",null,n.a.createElement("button",{onClick:this.learnMode,className:"uk-button uk-button-primary uk-button-small uk-width-1-1"},"learn \xa0",n.a.createElement("span",{"uk-icon":"social"})));for(var o=0;o<h.length;o++)i.push(n.a.createElement(b,{key:h[o].id,label:h[o].testLabel,text:h[o].test,order:h[o].order,handler:this.childClick,curbut:this.state.currentButton,curmode:this.state.mode,curmark:this.state.currentAnswerMark}));e=this.state.currentButton<=h.length?{pointerEvents:"none",opacity:.5}:{pointerEvents:"all",opacity:1},t=n.a.createElement("div",null,n.a.createElement(g,{curbut:this.state.currentButton,correctans:this.correctAnswer}))}return n.a.createElement("div",null,n.a.createElement("div",{id:"media-container",className:"uk-container uk-width-1-2@m uk-border-rounded",style:r},t),n.a.createElement("div",{id:"steps-container",className:"uk-container uk-width-1-2@m"},i,a))}}]),e}(r.Component),w=function(t){function e(){var t;return Object(o.a)(this,e),(t=Object(c.a)(this,Object(d.a)(e).call(this))).state={},t}return Object(u.a)(e,t),Object(l.a)(e,[{key:"render",value:function(){return n.a.createElement("div",null,n.a.createElement(x,null))}}]),e}(r.Component);s.a.render(n.a.createElement(w,{media:"images-interactive"}),document.getElementById("root"))}},[[12,1,2]]]);
//# sourceMappingURL=main.88846ea2.chunk.js.map