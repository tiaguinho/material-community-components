(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{yVth:function(e,c,b){"use strict";b.r(c),b.d(c,"ColorPickerModule",(function(){return z}));var o=b("ofXK"),t=b("3Pt+"),r=b("bTqV"),l=b("Wp6s"),a=b("kmnG"),i=b("zkoq"),n=b("NFeN"),d=b("qFsG"),s=b("wZkO"),O=b("tyNb"),N=b("psLn"),m=b("fXoL");let v=(()=>{class e{}return e.\u0275fac=function(c){return new(c||e)},e.\u0275cmp=m.Db({type:e,selectors:[["app-color-picker-api"]],decls:358,vars:2,consts:[[1,"table-api-documentation"],[1,"api-description"],[1,"highlight"]],template:function(e,c){1&e&&(m.Ob(0,"h2"),m.vc(1,"Components"),m.Nb(),m.Ob(2,"h3"),m.vc(3,"MccColorPicker"),m.Nb(),m.Ob(4,"p"),m.vc(5,"This is the main class of the component."),m.Nb(),m.Ob(6,"h4"),m.vc(7,"Inputs"),m.Nb(),m.Ob(8,"table",0),m.Ob(9,"thead"),m.Ob(10,"tr"),m.Ob(11,"th"),m.vc(12,"Name"),m.Nb(),m.Ob(13,"th"),m.vc(14,"Description"),m.Nb(),m.Nb(),m.Nb(),m.Ob(15,"tbody"),m.Ob(16,"tr"),m.Ob(17,"td"),m.Ob(18,"code"),m.vc(19,"disabled: boolean"),m.Nb(),m.Nb(),m.Ob(20,"td",1),m.vc(21,"Disable color-picker pop up"),m.Nb(),m.Nb(),m.Ob(22,"tr"),m.Ob(23,"td"),m.Ob(24,"code"),m.vc(25,"usedColorLabel: string"),m.Nb(),m.Nb(),m.Ob(26,"td",1),m.vc(27,"Change the label of the used colors collection"),m.Nb(),m.Nb(),m.Ob(28,"tr"),m.Ob(29,"td"),m.Ob(30,"code"),m.vc(31,"usedColorStart: string[]"),m.Nb(),m.Nb(),m.Ob(32,"td",1),m.vc(33,"Set initial value for used colors collection"),m.Nb(),m.Nb(),m.Ob(34,"tr"),m.Ob(35,"td"),m.Ob(36,"code"),m.vc(37,"reverseUsedColors: boolean"),m.Nb(),m.Nb(),m.Ob(38,"td",1),m.vc(39,"Reverse order of used colors list"),m.Nb(),m.Nb(),m.Ob(40,"tr"),m.Ob(41,"td"),m.Ob(42,"code"),m.vc(43,"usedColorsPosition: MccUsedColorsPosition"),m.Nb(),m.Nb(),m.Ob(44,"td",1),m.vc(45,"Set position for used colors collection to be show"),m.Nb(),m.Nb(),m.Ob(46,"tr"),m.Ob(47,"td"),m.Ob(48,"code"),m.vc(49,"hideHexForms: boolean"),m.Nb(),m.Nb(),m.Ob(50,"td",1),m.vc(51,"Hide the hexadecimal color input form"),m.Nb(),m.Nb(),m.Ob(52,"tr"),m.Ob(53,"td"),m.Ob(54,"code"),m.vc(55,"hideEmpty: boolean"),m.Nb(),m.Nb(),m.Ob(56,"td",1),m.vc(57,"Hide all empty slots of the default collection"),m.Nb(),m.Nb(),m.Ob(58,"tr"),m.Ob(59,"td"),m.Ob(60,"code"),m.vc(61,"hideTransparentUsedColors: boolean"),m.Nb(),m.Nb(),m.Ob(62,"td",1),m.vc(63,"Hide transparent option of UsedColors"),m.Nb(),m.Nb(),m.Ob(64,"tr"),m.Ob(65,"td"),m.Ob(66,"code"),m.vc(67,"hideUsedColors: boolean"),m.Nb(),m.Nb(),m.Ob(68,"td",1),m.vc(69,"Hide UsedColors default collection"),m.Nb(),m.Nb(),m.Ob(70,"tr"),m.Ob(71,"td"),m.Ob(72,"code"),m.vc(73,"hideButtons: boolean"),m.Nb(),m.Nb(),m.Ob(74,"td",1),m.vc(75,"Hide the buttons (confirm/cancel)"),m.Nb(),m.Nb(),m.Ob(76,"tr"),m.Ob(77,"td"),m.Ob(78,"code"),m.vc(79,"hideColorPickerSelector: boolean"),m.Nb(),m.Nb(),m.Ob(80,"td",1),m.vc(81,"Hide the color picker selector"),m.Nb(),m.Nb(),m.Ob(82,"tr"),m.Ob(83,"td"),m.Ob(84,"code"),m.vc(85,"colorPickerSelectorHeight: number"),m.Nb(),m.Nb(),m.Ob(86,"td",1),m.vc(87,"Define new height of selector area"),m.Nb(),m.Nb(),m.Ob(88,"tr"),m.Ob(89,"td"),m.Ob(90,"code"),m.vc(91,"selectedColor: string"),m.Nb(),m.Nb(),m.Ob(92,"td",1),m.vc(93,"Define initially selected color"),m.Nb(),m.Nb(),m.Ob(94,"tr"),m.Ob(95,"td"),m.Ob(96,"code"),m.vc(97,"isOpen: boolean"),m.Nb(),m.Nb(),m.Ob(98,"td",1),m.vc(99,"Define if panel will initiate open"),m.Nb(),m.Nb(),m.Ob(100,"tr"),m.Ob(101,"td"),m.Ob(102,"code"),m.vc(103,"overlay: boolean"),m.Nb(),m.Nb(),m.Ob(104,"td",1),m.vc(105,"Define if panel will be show inside overlay"),m.Nb(),m.Nb(),m.Ob(106,"tr"),m.Ob(107,"td"),m.Ob(108,"code"),m.vc(109,"usedSizeColors: number"),m.Nb(),m.Nb(),m.Ob(110,"td",1),m.vc(111,"Set the size of used colors collection"),m.Nb(),m.Nb(),m.Ob(112,"tr"),m.Ob(113,"td"),m.Ob(114,"code"),m.vc(115,"btnCancelLabel: string"),m.Nb(),m.Nb(),m.Ob(116,"td",1),m.vc(117,"Will replace the default text( "),m.Ob(118,"code"),m.vc(119,"Cancel"),m.Nb(),m.vc(120,") in cancel button"),m.Nb(),m.Nb(),m.Ob(121,"tr"),m.Ob(122,"td"),m.Ob(123,"code"),m.vc(124,"btnConfirmLabel: string"),m.Nb(),m.Nb(),m.Ob(125,"td",1),m.vc(126,"Will replace the default text( "),m.Ob(127,"code"),m.vc(128,"Confirm"),m.Nb(),m.vc(129,") in confirm button"),m.Nb(),m.Nb(),m.Nb(),m.Nb(),m.Ob(130,"h4"),m.vc(131,"Outputs"),m.Nb(),m.Ob(132,"table",0),m.Ob(133,"thead"),m.Ob(134,"tr"),m.Ob(135,"th"),m.vc(136,"Name"),m.Nb(),m.Ob(137,"th"),m.vc(138,"Description"),m.Nb(),m.Nb(),m.Nb(),m.Ob(139,"tbody"),m.Ob(140,"tr"),m.Ob(141,"td"),m.Ob(142,"code"),m.vc(143,"change: EventEmitter"),m.Nb(),m.Nb(),m.Ob(144,"td",1),m.vc(145,"Event emitted when the color changed"),m.Nb(),m.Nb(),m.Ob(146,"tr"),m.Ob(147,"td"),m.Ob(148,"code"),m.vc(149,"selected: EventEmitter"),m.Nb(),m.Nb(),m.Ob(150,"td",1),m.vc(151,"Event emitted when the color is selected"),m.Nb(),m.Nb(),m.Ob(152,"tr"),m.Ob(153,"td"),m.Ob(154,"code"),m.vc(155,"clickOut: EventEmitter"),m.Nb(),m.Nb(),m.Ob(156,"td",1),m.vc(157,"Event emitted when is user clicks outside of the component"),m.Nb(),m.Nb(),m.Ob(158,"tr"),m.Ob(159,"td"),m.Ob(160,"code"),m.vc(161,"canceled: EventEmitter"),m.Nb(),m.Nb(),m.Ob(162,"td",1),m.vc(163,"Event emitted when is user clicks on cancel button"),m.Nb(),m.Nb(),m.Nb(),m.Nb(),m.Kb(164,"hr"),m.Ob(165,"h3"),m.vc(166,"MccColorPickerCollection"),m.Nb(),m.Ob(167,"p"),m.vc(168,"This class is used to pass your own collection of colors to be displayed inside the color picker."),m.Nb(),m.Ob(169,"h4"),m.vc(170,"Inputs"),m.Nb(),m.Ob(171,"table",0),m.Ob(172,"thead"),m.Ob(173,"tr"),m.Ob(174,"th"),m.vc(175,"Name"),m.Nb(),m.Ob(176,"th"),m.vc(177,"Description"),m.Nb(),m.Nb(),m.Nb(),m.Ob(178,"tbody"),m.Ob(179,"tr"),m.Ob(180,"td"),m.Ob(181,"code"),m.vc(182,"hideEmpty: boolean"),m.Nb(),m.Nb(),m.Ob(183,"td",1),m.vc(184,"Hide all empty slots inside de collection"),m.Nb(),m.Nb(),m.Ob(185,"tr"),m.Ob(186,"td"),m.Ob(187,"code"),m.vc(188,"label: string"),m.Nb(),m.Nb(),m.Ob(189,"td",1),m.vc(190,"String with the name of the collection"),m.Nb(),m.Nb(),m.Ob(191,"tr"),m.Ob(192,"td"),m.Ob(193,"code"),m.vc(194,"colors: MccColorPickerOption[]"),m.Nb(),m.Nb(),m.Ob(195,"td",1),m.vc(196,"Array of the colors that will be displayed inside the collection"),m.Nb(),m.Nb(),m.Ob(197,"tr"),m.Ob(198,"td"),m.Ob(199,"code"),m.vc(200,"size: number"),m.Nb(),m.Nb(),m.Ob(201,"td",1),m.vc(202,"Limit of colors to be displayed"),m.Nb(),m.Nb(),m.Ob(203,"tr"),m.Ob(204,"td"),m.Ob(205,"code"),m.vc(206,"transparent: boolean"),m.Nb(),m.Nb(),m.Ob(207,"td",1),m.vc(208,"Show transparent options (default is false)"),m.Nb(),m.Nb(),m.Nb(),m.Nb(),m.Ob(209,"h4"),m.vc(210,"Outputs"),m.Nb(),m.Ob(211,"table",0),m.Ob(212,"thead"),m.Ob(213,"tr"),m.Ob(214,"th"),m.vc(215,"Name"),m.Nb(),m.Ob(216,"th"),m.vc(217,"Description"),m.Nb(),m.Nb(),m.Nb(),m.Ob(218,"tbody"),m.Ob(219,"tr"),m.Ob(220,"td"),m.Ob(221,"code"),m.vc(222,"changeColor"),m.Nb(),m.Nb(),m.Ob(223,"td",1),m.vc(224,"Event that id emitted when a change ocurred"),m.Nb(),m.Nb(),m.Nb(),m.Nb(),m.Kb(225,"hr"),m.Ob(226,"h2"),m.vc(227,"Services"),m.Nb(),m.Ob(228,"h3"),m.vc(229,"MccColorPickerService"),m.Nb(),m.Ob(230,"p"),m.vc(231,"You can use service to add, get and reset the used colors component data."),m.Nb(),m.Ob(232,"h4"),m.vc(233,"Methods"),m.Nb(),m.Ob(234,"table",0),m.Ob(235,"thead"),m.Ob(236,"tr"),m.Ob(237,"th"),m.vc(238,"Name"),m.Nb(),m.Ob(239,"th"),m.vc(240,"Description"),m.Nb(),m.Nb(),m.Nb(),m.Ob(241,"tbody"),m.Ob(242,"tr"),m.Ob(243,"td"),m.Ob(244,"code"),m.vc(245,"addColor(color: string): void"),m.Nb(),m.Nb(),m.Ob(246,"td",1),m.vc(247,"Add new color to the used color collection"),m.Nb(),m.Nb(),m.Ob(248,"tr"),m.Ob(249,"td"),m.Ob(250,"code"),m.vc(251),m.Nb(),m.Nb(),m.Ob(252,"td",1),m.vc(253,"Return observable of used color collection"),m.Nb(),m.Nb(),m.Ob(254,"tr"),m.Ob(255,"td"),m.Ob(256,"code"),m.vc(257,"resetUsedColors(): void"),m.Nb(),m.Nb(),m.Ob(258,"td",1),m.vc(259,"Clear the used color collection"),m.Nb(),m.Nb(),m.Nb(),m.Nb(),m.Kb(260,"hr"),m.Ob(261,"h2"),m.vc(262,"Directives"),m.Nb(),m.Ob(263,"p"),m.vc(264,"Using "),m.Ob(265,"code",2),m.vc(266,"MccColorPickerOrigin"),m.Nb(),m.vc(267," and "),m.Ob(268,"code",2),m.vc(269,"MccConnectedColorPicker"),m.Nb(),m.vc(270,", you also can connect the color picker with any input, textarea or select element."),m.Nb(),m.Ob(271,"h3"),m.vc(272,"MccColorPickerOrigin"),m.Nb(),m.Ob(273,"p"),m.vc(274,"This directive goes in the element (input, textarea or select) that will be connected to the color picker."),m.Nb(),m.Ob(275,"h4"),m.vc(276,"Outputs"),m.Nb(),m.Ob(277,"table",0),m.Ob(278,"thead"),m.Ob(279,"tr"),m.Ob(280,"th"),m.vc(281,"Name"),m.Nb(),m.Ob(282,"th"),m.vc(283,"Description"),m.Nb(),m.Nb(),m.Nb(),m.Ob(284,"tbody"),m.Ob(285,"tr"),m.Ob(286,"td"),m.Ob(287,"code"),m.vc(288,"changes: string"),m.Nb(),m.Nb(),m.Ob(289,"td",1),m.vc(290,"Emit changes from the origin"),m.Nb(),m.Nb(),m.Nb(),m.Nb(),m.Ob(291,"h3"),m.vc(292,"MccConnectedColorPicker"),m.Nb(),m.Ob(293,"p"),m.vc(294,"This directive is used in the color picker that you want's to connect."),m.Nb(),m.Ob(295,"h4"),m.vc(296,"Inputs"),m.Nb(),m.Ob(297,"table",0),m.Ob(298,"thead"),m.Ob(299,"tr"),m.Ob(300,"th"),m.vc(301,"Name"),m.Nb(),m.Ob(302,"th"),m.vc(303,"Description"),m.Nb(),m.Nb(),m.Nb(),m.Ob(304,"tbody"),m.Ob(305,"tr"),m.Ob(306,"td"),m.Ob(307,"code"),m.vc(308,"mccConnectedColorPickerOrigin: MccColorPickerOrigin"),m.Nb(),m.Nb(),m.Ob(309,"td",0),m.vc(310,"Element that color picker has to connect"),m.Nb(),m.Nb(),m.Nb(),m.Nb(),m.Kb(311,"hr"),m.Ob(312,"h2"),m.vc(313,"Interfaces & Types"),m.Nb(),m.Ob(314,"h3"),m.vc(315,"MccColorPickerOption"),m.Nb(),m.Ob(316,"p"),m.vc(317,"Is a type created to handle colors. This type accept "),m.Ob(318,"code",2),m.vc(319,"string"),m.Nb(),m.vc(320," or "),m.Ob(321,"code",2),m.vc(322,"MccColorPickerItem"),m.Nb(),m.vc(323,"."),m.Nb(),m.Ob(324,"h3"),m.vc(325,"MccUsedColorsPosition"),m.Nb(),m.Ob(326,"p"),m.vc(327,"Is a type created to handle used colors position. This type accept the values "),m.Ob(328,"code",2),m.vc(329,"top"),m.Nb(),m.vc(330," and "),m.Ob(331,"code",2),m.vc(332,"bottom"),m.Nb(),m.vc(333,"."),m.Nb(),m.Ob(334,"h3"),m.vc(335,"MccColorPickerItem"),m.Nb(),m.Ob(336,"p"),m.vc(337,"This interface is used when you have the name of the color. This can help screen readers."),m.Nb(),m.Ob(338,"table",0),m.Ob(339,"thead"),m.Ob(340,"tr"),m.Ob(341,"th"),m.vc(342,"Attribute"),m.Nb(),m.Ob(343,"th"),m.vc(344,"Description"),m.Nb(),m.Nb(),m.Nb(),m.Ob(345,"tbody"),m.Ob(346,"tr"),m.Ob(347,"td"),m.Ob(348,"code"),m.vc(349,"text: string"),m.Nb(),m.Nb(),m.Ob(350,"td",1),m.vc(351,"Name of the color"),m.Nb(),m.Nb(),m.Ob(352,"tr"),m.Ob(353,"td"),m.Ob(354,"code"),m.vc(355,"value: string"),m.Nb(),m.Nb(),m.Ob(356,"td",1),m.vc(357,"Hexadecimal of the color"),m.Nb(),m.Nb(),m.Nb(),m.Nb()),2&e&&(m.zb(251),m.yc("getColors(): Observable","<","string[]",">",""))},encapsulation:2,changeDetection:0}),e})();var p=b("V6/q"),h=b("f5NW"),u=b("z+Tm");let C=(()=>{class e{constructor(e){this.formBuilder=e,this.disabled=!1,this.colors=["#FF6633","#FFB399","#FF33FF","#FFFF99","#00B3E6","#E6B333","#3366E6","#999966","#99FF99","#B34D4D","#80B300","#809900","#E6B3B3","#6680B3","#66991A","#FF99E6","#CCFF1A","#FF1A66","#E6331A","#33FFCC","#66994D","#B366CC","#4D8000","#B33300","#CC80CC","#66664D","#991AFF","#E666FF","#4DB3FF","#1AB399","#E666B3","#33991A","#CC9999","#B3B31A","#00E680","#4D8066","#809980","#E6FF80","#1AFF33","#999933","#FF3380","#CCCC00","#66E64D","#4D80CC","#9900B3","#E64D66","#4DB380","#FF4D4D","#99E6E6","#6666FF"]}ngOnInit(){this.form=this.formBuilder.group({color:["#000000",t.C.required]})}}return e.\u0275fac=function(c){return new(c||e)(m.Jb(t.f))},e.\u0275cmp=m.Db({type:e,selectors:[["app-color-picker-alpha"]],features:[m.yb([{provide:p.a,useValue:!0}])],decls:22,vars:11,consts:[[3,"usedColorLabel"],[3,"label","colors"],["reverseUsedColors","",3,"usedColorLabel"],[3,"usedColorLabel","selected"]],template:function(e,c){1&e&&(m.Ob(0,"mat-card"),m.Ob(1,"mat-card-header"),m.Ob(2,"mat-card-title"),m.vc(3," Change used color label (with Alpha enabled) "),m.Nb(),m.Nb(),m.Ob(4,"mat-card-content"),m.Ob(5,"mcc-color-picker",0),m.Kb(6,"mcc-color-picker-collection",1),m.Nb(),m.Nb(),m.Nb(),m.Ob(7,"mat-card"),m.Ob(8,"mat-card-header"),m.Ob(9,"mat-card-title"),m.vc(10," Show used color in reverse (with Alpha enabled) "),m.Nb(),m.Nb(),m.Ob(11,"mat-card-content"),m.Ob(12,"mcc-color-picker",2),m.Kb(13,"mcc-color-picker-collection",1),m.Nb(),m.Nb(),m.Nb(),m.Ob(14,"mat-card"),m.Ob(15,"mat-card-header"),m.Ob(16,"mat-card-title"),m.Ob(17,"span"),m.vc(18,"Change color when confirm (with Alpha enabled)"),m.Nb(),m.Nb(),m.Nb(),m.Ob(19,"mat-card-content"),m.Ob(20,"mcc-color-picker",3),m.Vb("selected",(function(e){return c.selectedColor=e})),m.Kb(21,"mcc-color-picker-collection",1),m.Nb(),m.Nb(),m.Nb()),2&e&&(m.zb(5),m.ec("usedColorLabel","My Colors"),m.zb(1),m.ec("label","First Collection")("colors",c.colors),m.zb(6),m.ec("usedColorLabel","My Colors"),m.zb(1),m.ec("label","First Collection")("colors",c.colors),m.zb(4),m.qc("color",c.selectedColor),m.zb(3),m.ec("usedColorLabel","My Colors"),m.zb(1),m.ec("label","First Collection")("colors",c.colors))},directives:[l.a,l.c,l.e,l.b,h.a,u.a],encapsulation:2,changeDetection:0}),e})();var f=b("urtB");let F=(()=>{class e{constructor(e,c){this.formBuilder=e,this.mccColorPickerService=c,this.disabled=!1,this.usedStart=["#FF3380","#CCCC00","#66E64D","#4D80CC","#9900B3","#E64D66","#4DB380","#FF4D4D","#99E6E6","#6666FF","#000zzz","zzzzzz"],this.colors=["#FF6633","#FFB399","#FF33FF","#FFFF99","#00B3E6","#E6B333","#3366E6","#999966","#99FF99","#B34D4D","#80B300","#809900","#E6B3B3","#6680B3","#66991A","#FF99E6","#CCFF1A","#FF1A66","#E6331A","#33FFCC","#66994D","#B366CC","#4D8000","#B33300","#CC80CC","#66664D","#991AFF","#E666FF","#4DB3FF","#1AB399","#E666B3","#33991A","#CC9999","#B3B31A","#00E680","#4D8066","#809980","#E6FF80","#1AFF33","#999933","#FF3380","#CCCC00","#66E64D","#4D80CC","#9900B3","#E64D66","#4DB380","#FF4D4D","#99E6E6","#6666FF"],this.items=[{text:"Black",value:"#000000"},{text:"White",value:"#FFFFFF"},{text:"Gray",value:"#CCCCCC"}]}ngOnInit(){this.form=this.formBuilder.group({color:["#000000",t.C.required]})}reset(){this.mccColorPickerService.resetUseColors()}onSubmit({value:e,valid:c}){console.log(e,c)}}return e.\u0275fac=function(c){return new(c||e)(m.Jb(t.f),m.Jb(p.c))},e.\u0275cmp=m.Db({type:e,selectors:[["app-color-picker-examples"]],decls:132,vars:48,consts:[[3,"overlay","usedColorLabel","selected"],[3,"colors"],[3,"disabled"],["hideEmpty","true",3,"label","colors"],["mat-raised-button","","color","primary",2,"margin-left","1rem",3,"click"],[3,"usedColorLabel"],[3,"label","colors"],[3,"usedColorsPosition"],["reverseUsedColors","",3,"usedColorLabel"],["colorPickerSelectorHeight","100","usedSizeColors","15",1,"mcc-cp-small"],["mat-button","",3,"click"],[3,"label"],["mccConnectedColorPicker","",3,"mccConnectedColorPickerOrigin"],["novalidate","",3,"formGroup","ngSubmit"],["matInput","","mccColorPickerOrigin","","formControlName","color"],["trigger","mccColorPickerOrigin"],["type","submit","mat-raised-button","","color","primary"],[3,"usedColorLabel","selected"],[3,"usedColorLabel","usedSizeColors","change","selected"],[3,"usedColorLabel","usedColorStart"],["hideEmptyUsedColors",""],[3,"hideHexForms"],["hideTransparentUsedColors",""],[3,"btnCancelLabel","btnConfirmLabel"],["hideButtons",""]],template:function(e,c){if(1&e&&(m.Ob(0,"mat-card"),m.Ob(1,"mat-card-header"),m.Ob(2,"mat-card-title"),m.Ob(3,"span"),m.vc(4,"Component without overlay"),m.Nb(),m.Nb(),m.Nb(),m.Ob(5,"mat-card-content"),m.Ob(6,"mcc-color-picker",0),m.Vb("selected",(function(e){return c.selectedColor=e})),m.Kb(7,"mcc-color-picker-collection",1),m.Nb(),m.Nb(),m.Nb(),m.Ob(8,"mat-card"),m.Ob(9,"mat-card-header"),m.Ob(10,"mat-card-title"),m.vc(11,"Change buttons label"),m.Nb(),m.Nb(),m.Ob(12,"mat-card-content"),m.Ob(13,"mcc-color-picker",2),m.Kb(14,"mcc-color-picker-collection",3),m.Nb(),m.Ob(15,"button",4),m.Vb("click",(function(){return c.disabled=!c.disabled})),m.vc(16,"Disable /Enable"),m.Nb(),m.Nb(),m.Nb(),m.Ob(17,"mat-card"),m.Ob(18,"mat-card-header"),m.Ob(19,"mat-card-title"),m.vc(20," Change used color label "),m.Nb(),m.Nb(),m.Ob(21,"mat-card-content"),m.Ob(22,"mcc-color-picker",5),m.Kb(23,"mcc-color-picker-collection",6),m.Nb(),m.Nb(),m.Nb(),m.Ob(24,"mat-card"),m.Ob(25,"mat-card-header"),m.Ob(26,"mat-card-title"),m.vc(27," Change used color position "),m.Nb(),m.Nb(),m.Ob(28,"mat-card-content"),m.Ob(29,"mcc-color-picker",7),m.Kb(30,"mcc-color-picker-collection",6),m.Nb(),m.Nb(),m.Nb(),m.Kb(31,"app-color-picker-alpha"),m.Ob(32,"mat-card"),m.Ob(33,"mat-card-header"),m.Ob(34,"mat-card-title"),m.vc(35," Show used color in reverse "),m.Nb(),m.Nb(),m.Ob(36,"mat-card-content"),m.Ob(37,"mcc-color-picker",8),m.Kb(38,"mcc-color-picker-collection",6),m.Nb(),m.Nb(),m.Nb(),m.Ob(39,"mat-card"),m.Ob(40,"mat-card-header"),m.Ob(41,"mat-card-title"),m.vc(42,"Colors as objects"),m.Nb(),m.Nb(),m.Ob(43,"mat-card-content"),m.Ob(44,"mcc-color-picker"),m.Kb(45,"mcc-color-picker-collection",6),m.Nb(),m.Nb(),m.Nb(),m.Ob(46,"mat-card"),m.Ob(47,"mat-card-header"),m.Ob(48,"mat-card-title"),m.vc(49,"Change selector height & usedColors size"),m.Nb(),m.Nb(),m.Ob(50,"mat-card-content"),m.Kb(51,"mcc-color-picker",9),m.Nb(),m.Nb(),m.Ob(52,"mat-card"),m.Ob(53,"mat-card-header"),m.Ob(54,"mat-card-title"),m.vc(55,"Reset used colors"),m.Nb(),m.Nb(),m.Ob(56,"mat-card-content"),m.Ob(57,"button",10),m.Vb("click",(function(){return c.reset()})),m.vc(58,"RESET"),m.Nb(),m.Ob(59,"mcc-color-picker"),m.Kb(60,"mcc-color-picker-collection",11),m.Nb(),m.Nb(),m.Nb(),m.Ob(61,"mat-card"),m.Ob(62,"mat-card-header"),m.Ob(63,"mat-card-title"),m.vc(64,"Connect color picker with an input"),m.Nb(),m.Nb(),m.Ob(65,"mat-card-content"),m.Kb(66,"mcc-color-picker",12),m.Ob(67,"form",13),m.Vb("ngSubmit",(function(){return c.onSubmit(c.form)})),m.Ob(68,"mat-form-field"),m.Kb(69,"input",14,15),m.Nb(),m.Ob(71,"button",16),m.vc(72,"Submit "),m.Ob(73,"small"),m.vc(74,"(look the console)"),m.Nb(),m.Nb(),m.Nb(),m.Nb(),m.Nb(),m.Ob(75,"mat-card"),m.Ob(76,"mat-card-header"),m.Ob(77,"mat-card-title"),m.Ob(78,"span"),m.vc(79,"Change color when confirm"),m.Nb(),m.Nb(),m.Nb(),m.Ob(80,"mat-card-content"),m.Ob(81,"mcc-color-picker",17),m.Vb("selected",(function(e){return c.selectedColor=e})),m.Kb(82,"mcc-color-picker-collection",6),m.Nb(),m.Nb(),m.Nb(),m.Ob(83,"mat-card"),m.Ob(84,"mat-card-header"),m.Ob(85,"mat-card-title"),m.Ob(86,"span"),m.vc(87,"Change color on change"),m.Nb(),m.Nb(),m.Nb(),m.Ob(88,"mat-card-content"),m.Ob(89,"mcc-color-picker",18),m.Vb("change",(function(e){return c.changeColor=e}))("selected",(function(e){return c.changeColor=e})),m.Kb(90,"mcc-color-picker-collection",6),m.Nb(),m.Nb(),m.Nb(),m.Ob(91,"mat-card"),m.Ob(92,"mat-card-header"),m.Ob(93,"mat-card-title"),m.vc(94,"Define used colors init value"),m.Nb(),m.Nb(),m.Ob(95,"mat-card-content"),m.Ob(96,"mcc-color-picker",19),m.Kb(97,"mcc-color-picker-collection",6),m.Nb(),m.Nb(),m.Nb(),m.Ob(98,"mat-card"),m.Ob(99,"mat-card-header"),m.Ob(100,"mat-card-title"),m.vc(101,"Hide empty slot of colors"),m.Nb(),m.Nb(),m.Ob(102,"mat-card-content"),m.Ob(103,"mcc-color-picker",20),m.Kb(104,"mcc-color-picker-collection",3),m.Nb(),m.Nb(),m.Nb(),m.Ob(105,"mat-card"),m.Ob(106,"mat-card-header"),m.Ob(107,"mat-card-title"),m.vc(108,"Hide hex colors form"),m.Nb(),m.Nb(),m.Ob(109,"mat-card-content"),m.Kb(110,"mcc-color-picker",21),m.Nb(),m.Nb(),m.Ob(111,"mat-card"),m.Ob(112,"mat-card-header"),m.Ob(113,"mat-card-title"),m.vc(114,"Hide transparaent option of used colors"),m.Nb(),m.Nb(),m.Ob(115,"mat-card-content"),m.Ob(116,"mcc-color-picker",22),m.Kb(117,"mcc-color-picker-collection",3),m.Nb(),m.Nb(),m.Nb(),m.Ob(118,"mat-card"),m.Ob(119,"mat-card-header"),m.Ob(120,"mat-card-title"),m.vc(121,"Change buttons label"),m.Nb(),m.Nb(),m.Ob(122,"mat-card-content"),m.Ob(123,"mcc-color-picker",23),m.Kb(124,"mcc-color-picker-collection",3),m.Nb(),m.Nb(),m.Nb(),m.Ob(125,"mat-card"),m.Ob(126,"mat-card-header"),m.Ob(127,"mat-card-title"),m.vc(128,"Hide buttons"),m.Nb(),m.Nb(),m.Ob(129,"mat-card-content"),m.Ob(130,"mcc-color-picker",24),m.Kb(131,"mcc-color-picker-collection",3),m.Nb(),m.Nb(),m.Nb()),2&e){const e=m.jc(70);m.zb(3),m.qc("color",c.selectedColor),m.zb(3),m.ec("overlay",!1)("usedColorLabel","My Colors"),m.zb(1),m.ec("colors",c.colors),m.zb(6),m.ec("disabled",c.disabled),m.zb(1),m.ec("label","First Collection")("colors",c.colors),m.zb(8),m.ec("usedColorLabel","My Colors"),m.zb(1),m.ec("label","First Collection")("colors",c.colors),m.zb(6),m.ec("usedColorsPosition","bottom"),m.zb(1),m.ec("label","First Collection")("colors",c.colors),m.zb(7),m.ec("usedColorLabel","My Colors"),m.zb(1),m.ec("label","First Collection")("colors",c.colors),m.zb(7),m.ec("label","First Object Collection")("colors",c.items),m.zb(15),m.ec("label","First Object Collection"),m.zb(6),m.ec("mccConnectedColorPickerOrigin",e),m.zb(1),m.ec("formGroup",c.form),m.zb(11),m.qc("color",c.selectedColor),m.zb(3),m.ec("usedColorLabel","My Colors"),m.zb(1),m.ec("label","First Collection")("colors",c.colors),m.zb(4),m.qc("color","none"!==c.changeColor?c.changeColor:"rgba(0, 0, 0, 0.5)"),m.zb(3),m.ec("usedColorLabel","My Colors")("usedSizeColors","50"),m.zb(1),m.ec("label","First Collection")("colors",c.colors),m.zb(6),m.ec("usedColorLabel","My Colors")("usedColorStart",c.usedStart),m.zb(1),m.ec("label","First Collection")("colors",c.colors),m.zb(7),m.ec("label","First Collection")("colors",c.colors),m.zb(6),m.ec("hideHexForms",!0),m.zb(7),m.ec("label","First Collection")("colors",c.colors),m.zb(6),m.ec("btnCancelLabel","ESC")("btnConfirmLabel","OK"),m.zb(1),m.ec("label","First Collection")("colors",c.colors),m.zb(7),m.ec("label","First Collection")("colors",c.colors)}},directives:[l.a,l.c,l.e,l.b,h.a,u.a,r.b,C,f.c,t.E,t.r,t.j,a.b,d.a,t.c,f.b,t.q,t.i],encapsulation:2,changeDetection:0}),e})();function g(e,c){1&e&&m.vc(0," Overview ")}function k(e,c){1&e&&m.vc(0," API ")}function y(e,c){1&e&&m.vc(0," Examples ")}const D=[{path:"",component:(()=>{class e{}return e.\u0275fac=function(c){return new(c||e)},e.\u0275cmp=m.Db({type:e,selectors:[["app-color-picker"]],decls:137,vars:6,consts:[[1,"page-title"],[1,"page-subtitle"],["mat-tab-label",""],["cols","4","rowHeight","70px"],["colspan","3"],["href","https://github.com/tiaguinho/material-community-components/tree/master/src/lib/color-picker","target","_blank"],["src","https://tiaguinho.github.io/material-community-components/demo-app/assets/img/source-code.png","alt","Source Code",1,"source-code"],[1,"code-snippet"],[1,"lang-typescript"],[1,"hljs-variable"],[1,"hljs-attribute"],[1,"hljs-string"],[1,"table-api-documentation"],[1,"api-description"],[1,"highlight"],["label","Examples"]],template:function(e,c){1&e&&(m.Ob(0,"h1",0),m.Ob(1,"mat-icon"),m.vc(2,"colorize"),m.Nb(),m.vc(3," Color Picker\n"),m.Nb(),m.Ob(4,"p",1),m.vc(5,"documentation of "),m.Ob(6,"span"),m.vc(7,"mcc-color-picker"),m.Nb(),m.vc(8," component"),m.Nb(),m.Ob(9,"mat-tab-group"),m.Ob(10,"mat-tab"),m.tc(11,g,1,0,"ng-template",2),m.Ob(12,"mat-grid-list",3),m.Ob(13,"mat-grid-tile",4),m.Ob(14,"h2"),m.vc(15,"MccColorPicker"),m.Nb(),m.Nb(),m.Ob(16,"mat-grid-tile"),m.Ob(17,"a",5),m.Kb(18,"img",6),m.Nb(),m.Nb(),m.Nb(),m.Ob(19,"p"),m.vc(20,"When import the "),m.Ob(21,"code"),m.vc(22,"MccColorPickerModule"),m.Nb(),m.vc(23,", you can provide some configurations."),m.Nb(),m.Ob(24,"pre",7),m.Ob(25,"code",8),m.vc(26),m.Ob(27,"span",9),m.vc(28,"@NgModule"),m.Nb(),m.vc(29),m.Ob(30,"span",10),m.vc(31,"imports"),m.Nb(),m.vc(32),m.Ob(33,"span",10),m.vc(34,"empty_color"),m.Nb(),m.vc(35,": "),m.Ob(36,"span",11),m.vc(37,"'transparent',"),m.Nb(),m.vc(38,"\n        "),m.Ob(39,"span",10),m.vc(40,"used_colors"),m.Nb(),m.vc(41,": "),m.Ob(42,"span",11),m.vc(43,"['#000000', '#FFF555']"),m.Nb(),m.vc(44,"\n        "),m.Ob(45,"span",10),m.vc(46,"selected_icon"),m.Nb(),m.vc(47,": "),m.Ob(48,"span",11),m.vc(49,"'check'"),m.Nb(),m.vc(50,"\n        "),m.Ob(51,"span",10),m.vc(52,"disable_selected_icon"),m.Nb(),m.vc(53,": "),m.Ob(54,"span",11),m.vc(55,"false"),m.Nb(),m.vc(56,"\n        "),m.Ob(57,"span",10),m.vc(58,"enable_alpha_selector"),m.Nb(),m.vc(59,": "),m.Ob(60,"span",11),m.vc(61,"false"),m.Nb(),m.vc(62),m.Nb(),m.Nb(),m.Ob(63,"h4"),m.vc(64,"Configurations"),m.Nb(),m.Ob(65,"table",12),m.Ob(66,"thead"),m.Ob(67,"tr"),m.Ob(68,"th"),m.vc(69,"Name"),m.Nb(),m.Ob(70,"th"),m.vc(71,"Description"),m.Nb(),m.Ob(72,"th"),m.vc(73,"Default"),m.Nb(),m.Nb(),m.Nb(),m.Ob(74,"tbody"),m.Ob(75,"tr"),m.Ob(76,"td"),m.Ob(77,"code"),m.vc(78,"empty_color: string"),m.Nb(),m.Nb(),m.Ob(79,"td",13),m.vc(80,"Define any color you want"),m.Nb(),m.Ob(81,"td",13),m.vc(82,"none"),m.Nb(),m.Nb(),m.Ob(83,"tr"),m.Ob(84,"td"),m.Ob(85,"code"),m.vc(86,"used_colors: string[]"),m.Nb(),m.Nb(),m.Ob(87,"td",13),m.vc(88,"Define list of colors to start used colors"),m.Nb(),m.Ob(89,"td",13),m.vc(90,"[]"),m.Nb(),m.Nb(),m.Ob(91,"tr"),m.Ob(92,"td"),m.Ob(93,"code"),m.vc(94,"selected_icon: string"),m.Nb(),m.Nb(),m.Ob(95,"td",13),m.vc(96,"Define icon to be used on selected colors"),m.Nb(),m.Ob(97,"td",13),m.vc(98,"done"),m.Nb(),m.Nb(),m.Ob(99,"tr"),m.Ob(100,"td"),m.Ob(101,"code"),m.vc(102,"selected_svg_icon: string"),m.Nb(),m.Nb(),m.Ob(103,"td",13),m.vc(104,'Define SVG icon name to be used on selected colors (nees to be registered in MatIconRegistry). Overrides "selected_icon"'),m.Nb(),m.Ob(105,"td",13),m.vc(106,"null"),m.Nb(),m.Nb(),m.Ob(107,"tr"),m.Ob(108,"td"),m.Ob(109,"code"),m.vc(110,"disable_selected_icon: boolean"),m.Nb(),m.Nb(),m.Ob(111,"td",13),m.vc(112,"Disable selected icon showed when color is selected"),m.Nb(),m.Ob(113,"td",13),m.vc(114,"false"),m.Nb(),m.Nb(),m.Ob(115,"tr"),m.Ob(116,"td"),m.Ob(117,"code"),m.vc(118,"enable_alpha_selector: boolean"),m.Nb(),m.Nb(),m.Ob(119,"td",13),m.vc(120,"Enable alpha selector option"),m.Nb(),m.Ob(121,"td",13),m.vc(122,"false"),m.Nb(),m.Nb(),m.Nb(),m.Nb(),m.Ob(123,"p"),m.vc(124,"For "),m.Ob(125,"code",14),m.vc(126,"@Input"),m.Nb(),m.vc(127," and "),m.Ob(128,"code",14),m.vc(129,"@Output"),m.Nb(),m.vc(130," of the component, check API tab. "),m.Nb(),m.Nb(),m.Ob(131,"mat-tab"),m.tc(132,k,1,0,"ng-template",2),m.Kb(133,"app-color-picker-api"),m.Nb(),m.Ob(134,"mat-tab",15),m.tc(135,y,1,0,"ng-template",2),m.Kb(136,"app-color-picker-examples"),m.Nb(),m.Nb()),2&e&&(m.zb(26),m.yc(" import ","{"," MccColorPickerModule ","}"," from 'material-community-components';\n\n  "),m.zb(3),m.xc("(","{","\n    ...\n    "),m.zb(3),m.xc(": [\n      MccColorPickerModule.forRoot(","{","\n        "),m.zb(30),m.yc("\n      ","}",")\n    ]\n    ...\n  ","}",")\n"))},directives:[n.a,s.b,s.a,s.c,i.a,i.c,v,F],styles:[".mat-grid-list{border-bottom:1px solid #dadada}  .mat-grid-tile:first-child .mat-figure{justify-content:flex-start;align-items:flex-start}  .mat-grid-tile:first-child .mat-figure h2{border:0}.source-code[_ngcontent-%COMP%]{height:35px}"],changeDetection:0}),e})()}];b("5DDP");let z=(()=>{class e{}return e.\u0275mod=m.Hb({type:e}),e.\u0275inj=m.Gb({factory:function(c){return new(c||e)},imports:[[o.c,O.d.forChild(D),t.y,r.c,l.d,a.d,i.b,n.b,d.b,s.d,N.a.forRoot({used_colors:["#000000","#123456","#777666"]})]]}),e})()}}]);