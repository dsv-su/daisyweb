function dsvInitFootable(){$(".footable").footable({parsers:{swedish:function(t){return $.trim($(t).text().replace("w","v").replace("W","V"))}}})}!function(t,e,a){function o(){var t=this;t.id=null,t.busy=!1,t.start=function(e,a){t.busy||(t.stop(),t.id=setTimeout(function(){e(),t.id=null,t.busy=!1},a),t.busy=!0)},t.stop=function(){null!==t.id&&(clearTimeout(t.id),t.id=null,t.busy=!1)}}function i(a,i,n){var r=this;r.id=n,r.table=a,r.options=i,r.breakpoints=[],r.breakpointNames="",r.columns={},r.plugins=e.footable.plugins.load(r);var l=r.options,d=l.classes,s=l.events,u=l.triggers,f=0;return r.timers={resize:new o,register:function(t){return r.timers[t]=new o,r.timers[t]}},r.init=function(){var a=t(e),o=t(r.table);if(e.footable.plugins.init(r),o.hasClass(d.loaded))return void r.raise(s.alreadyInitialized);r.raise(s.initializing),o.addClass(d.loading),o.find(l.columnDataSelector).each(function(){var t=r.getColumnData(this);r.columns[t.index]=t});for(var i in l.breakpoints)r.breakpoints.push({name:i,width:l.breakpoints[i]}),r.breakpointNames+=i+" ";r.breakpoints.sort(function(t,e){return t.width-e.width}),o.unbind(u.initialize).bind(u.initialize,function(){o.removeData("footable_info"),o.data("breakpoint",""),o.trigger(u.resize),o.removeClass(d.loading),o.addClass(d.loaded).addClass(d.main),r.raise(s.initialized)}).unbind(u.redraw).bind(u.redraw,function(){r.redraw()}).unbind(u.resize).bind(u.resize,function(){r.resize()}).unbind(u.expandFirstRow).bind(u.expandFirstRow,function(){o.find(l.toggleSelector).first().not("."+d.detailShow).trigger(u.toggleRow)}).unbind(u.expandAll).bind(u.expandAll,function(){o.find(l.toggleSelector).not("."+d.detailShow).trigger(u.toggleRow)}).unbind(u.collapseAll).bind(u.collapseAll,function(){o.find("."+d.detailShow).trigger(u.toggleRow)}),o.trigger(u.initialize),a.bind("resize.footable",function(){r.timers.resize.stop(),r.timers.resize.start(function(){r.raise(u.resize)},l.delay)})},r.addRowToggle=function(){if(l.addRowToggle){var e=t(r.table),a=!1;e.find("span."+d.toggle).remove();for(var o in r.columns){var i=r.columns[o];if(i.toggle){a=!0;var n="> tbody > tr:not(."+d.detail+",."+d.disabled+") > td:nth-child("+(parseInt(i.index,10)+1)+"),> tbody > tr:not(."+d.detail+",."+d.disabled+") > th:nth-child("+(parseInt(i.index,10)+1)+")";return void e.find(n).not("."+d.detailCell).prepend(t(l.toggleHTMLElement).addClass(d.toggle))}}a||e.find("> tbody > tr:not(."+d.detail+",."+d.disabled+") > td:first-child").add("> tbody > tr:not(."+d.detail+",."+d.disabled+") > th:first-child").not("."+d.detailCell).prepend(t(l.toggleHTMLElement).addClass(d.toggle))}},r.setColumnClasses=function(){var e=t(r.table);for(var a in r.columns){var o=r.columns[a];if(null!==o.className){var i="",n=!0;t.each(o.matches,function(t,e){n||(i+=", "),i+="> tbody > tr:not(."+d.detail+") > td:nth-child("+(parseInt(e,10)+1)+")",n=!1}),e.find(i).not("."+d.detailCell).addClass(o.className)}}},r.bindToggleSelectors=function(){var e=t(r.table);r.hasAnyBreakpointColumn()&&(e.find(l.toggleSelector).unbind(u.toggleRow).bind(u.toggleRow,function(e){var a=t(this).is("tr")?t(this):t(this).parents("tr:first");r.toggleDetail(a)}),e.find(l.toggleSelector).unbind("click.footable").bind("click.footable",function(a){e.is(".breakpoint")&&t(a.target).is("td,th,."+d.toggle)&&t(this).trigger(u.toggleRow)}))},r.parse=function(t,e){var a=l.parsers[e.type]||l.parsers.alpha;return a(t)},r.getColumnData=function(e){var a=t(e),o=a.data("hide"),i=a.index();o=o||"",o=jQuery.map(o.split(","),function(t){return jQuery.trim(t)});var n={index:i,hide:{},type:a.data("type")||"alpha",name:a.data("name")||t.trim(a.text()),ignore:a.data("ignore")||!1,toggle:a.data("toggle")||!1,className:a.data("class")||null,matches:[],names:{},group:a.data("group")||null,groupName:null,isEditable:a.data("editable")};if(null!==n.group){var d=t(r.table).find('> thead > tr.footable-group-row > th[data-group="'+n.group+'"], > thead > tr.footable-group-row > td[data-group="'+n.group+'"]').first();n.groupName=r.parse(d,{type:"alpha"})}var u=parseInt(a.prev().attr("colspan")||0,10);f+=u>1?u-1:0;var c=parseInt(a.attr("colspan")||0,10),p=n.index+f;if(c>1){var h=a.data("names");h=h||"",h=h.split(",");for(var b=0;c>b;b++)n.matches.push(b+p),b<h.length&&(n.names[b+p]=h[b])}else n.matches.push(p);n.hide["default"]="all"===a.data("hide")||t.inArray("default",o)>=0;var g=!1;for(var v in l.breakpoints)n.hide[v]="all"===a.data("hide")||t.inArray(v,o)>=0,g=g||n.hide[v];n.hasBreakpoint=g;var m=r.raise(s.columnData,{column:{data:n,th:e}});return m.column.data},r.getViewportWidth=function(){return window.innerWidth||(document.body?document.body.offsetWidth:0)},r.calculateWidth=function(t,e){return jQuery.isFunction(l.calculateWidthOverride)?l.calculateWidthOverride(t,e):(e.viewportWidth<e.width&&(e.width=e.viewportWidth),e.parentWidth<e.width&&(e.width=e.parentWidth),e)},r.hasBreakpointColumn=function(t){for(var e in r.columns)if(r.columns[e].hide[t]){if(r.columns[e].ignore)continue;return!0}return!1},r.hasAnyBreakpointColumn=function(){for(var t in r.columns)if(r.columns[t].hasBreakpoint)return!0;return!1},r.resize=function(){var e=t(r.table);if(e.is(":visible")){if(!r.hasAnyBreakpointColumn())return void e.trigger(u.redraw);var a={width:e.width(),viewportWidth:r.getViewportWidth(),parentWidth:e.parent().width()};a=r.calculateWidth(e,a);var o=e.data("footable_info");if(e.data("footable_info",a),r.raise(s.resizing,{old:o,info:a}),!o||o&&o.width&&o.width!==a.width){for(var i,n=null,l=0;l<r.breakpoints.length;l++)if(i=r.breakpoints[l],i&&i.width&&a.width<=i.width){n=i;break}var d=null===n?"default":n.name,f=r.hasBreakpointColumn(d),c=e.data("breakpoint");e.data("breakpoint",d).removeClass("default breakpoint").removeClass(r.breakpointNames).addClass(d+(f?" breakpoint":"")),d!==c&&(e.trigger(u.redraw),r.raise(s.breakpoint,{breakpoint:d,info:a}))}r.raise(s.resized,{old:o,info:a})}},r.redraw=function(){r.addRowToggle(),r.bindToggleSelectors(),r.setColumnClasses();var e=t(r.table),a=e.data("breakpoint"),o=r.hasBreakpointColumn(a);e.find("> tbody > tr:not(."+d.detail+")").data("detail_created",!1).end().find("> thead > tr:last-child > th").each(function(){var o=r.columns[t(this).index()],i="",n=!0;t.each(o.matches,function(t,e){n||(i+=", ");var a=e+1;i+="> tbody > tr:not(."+d.detail+") > td:nth-child("+a+")",i+=", > tfoot > tr:not(."+d.detail+") > td:nth-child("+a+")",i+=", > colgroup > col:nth-child("+a+")",n=!1}),i+=', > thead > tr[data-group-row="true"] > th[data-group="'+o.group+'"]';var l=e.find(i).add(this);if(""!==a&&(o.hide[a]===!1?l.addClass("footable-visible").show():l.removeClass("footable-visible").hide()),1===e.find("> thead > tr.footable-group-row").length){var s=e.find('> thead > tr:last-child > th[data-group="'+o.group+'"]:visible, > thead > tr:last-child > th[data-group="'+o.group+'"]:visible'),u=e.find('> thead > tr.footable-group-row > th[data-group="'+o.group+'"], > thead > tr.footable-group-row > td[data-group="'+o.group+'"]'),f=0;t.each(s,function(){f+=parseInt(t(this).attr("colspan")||1,10)}),f>0?u.attr("colspan",f).show():u.hide()}}).end().find("> tbody > tr."+d.detailShow).each(function(){r.createOrUpdateDetailRow(this)}),e.find("[data-bind-name]").each(function(){r.toggleInput(this)}),e.find("> tbody > tr."+d.detailShow+":visible").each(function(){var e=t(this).next();e.hasClass(d.detail)&&(o?e.show():e.hide())}),e.find("> thead > tr > th.footable-last-column, > tbody > tr > td.footable-last-column").removeClass("footable-last-column"),e.find("> thead > tr > th.footable-first-column, > tbody > tr > td.footable-first-column").removeClass("footable-first-column"),e.find("> thead > tr, > tbody > tr").find("> th.footable-visible:last, > td.footable-visible:last").addClass("footable-last-column").end().find("> th.footable-visible:first, > td.footable-visible:first").addClass("footable-first-column"),r.raise(s.redrawn)},r.toggleDetail=function(e){var a=e.jquery?e:t(e),o=a.next();a.hasClass(d.detailShow)?(a.removeClass(d.detailShow),o.hasClass(d.detail)&&o.hide(),r.raise(s.rowCollapsed,{row:a[0]})):(r.createOrUpdateDetailRow(a[0]),a.addClass(d.detailShow).next().show(),r.raise(s.rowExpanded,{row:a[0]}))},r.removeRow=function(e){var a=e.jquery?e:t(e);a.hasClass(d.detail)&&(a=a.prev());var o=a.next();a.data("detail_created")===!0&&o.remove(),a.remove(),r.raise(s.rowRemoved)},r.appendRow=function(e){var a=e.jquery?e:t(e);t(r.table).find("tbody").append(a),r.redraw()},r.getColumnFromTdIndex=function(e){var a=null;for(var o in r.columns)if(t.inArray(e,r.columns[o].matches)>=0){a=r.columns[o];break}return a},r.createOrUpdateDetailRow=function(e){var a,o=t(e),i=o.next(),n=[];if(o.data("detail_created")===!0)return!0;if(o.is(":hidden"))return!1;if(r.raise(s.rowDetailUpdating,{row:o,detail:i}),o.find("> td:hidden").each(function(){var e=t(this).index(),a=r.getColumnFromTdIndex(e),o=a.name;if(a.ignore===!0)return!0;e in a.names&&(o=a.names[e]);var i=t(this).attr("data-bind-name");if(null!=i&&t(this).is(":empty")){var l=t("."+d.detailInnerValue+'[data-bind-value="'+i+'"]');t(this).html(t(l).contents().detach())}var s;return a.isEditable!==!1&&(a.isEditable||t(this).find(":input").length>0)&&(null==i&&(i="bind-"+t.now()+"-"+e,t(this).attr("data-bind-name",i)),s=t(this).contents().detach()),s||(s=t(this).contents().clone(!0,!0)),n.push({name:o,value:r.parse(this,a),display:s,group:a.group,groupName:a.groupName,bindName:i}),!0}),0===n.length)return!1;var u=o.find("> td:visible").length,f=i.hasClass(d.detail);return f||(i=t('<tr class="'+d.detail+'"><td class="'+d.detailCell+'"><div class="'+d.detailInner+'"></div></td></tr>'),o.after(i)),i.find("> td:first").attr("colspan",u),a=i.find("."+d.detailInner).empty(),l.createDetail(a,n,l.createGroupedDetail,l.detailSeparator,d),o.data("detail_created",!0),r.raise(s.rowDetailUpdated,{row:o,detail:i}),!f},r.raise=function(e,a){r.options.debug===!0&&t.isFunction(r.options.log)&&r.options.log(e,"event"),a=a||{};var o={ft:r};t.extend(!0,o,a);var i=t.Event(e,o);return i.ft||t.extend(!0,i,o),t(r.table).trigger(i),i},r.reset=function(){var e=t(r.table);e.removeData("footable_info").data("breakpoint","").removeClass(d.loading).removeClass(d.loaded),e.find(l.toggleSelector).unbind(u.toggleRow).unbind("click.footable"),e.find("> tbody > tr").removeClass(d.detailShow),e.find("> tbody > tr."+d.detail).remove(),r.raise(s.reset)},r.toggleInput=function(e){var a=t(e).attr("data-bind-name");if(null!=a){var o=t("."+d.detailInnerValue+'[data-bind-value="'+a+'"]');null!=o&&(t(e).is(":visible")?t(o).is(":empty")||t(e).html(t(o).contents().detach()):t(e).is(":empty")||t(o).html(t(e).contents().detach()))}},r.init(),r}e.footable={options:{delay:100,breakpoints:{phone:480,tablet:1024},parsers:{alpha:function(e){return t(e).data("value")||t.trim(t(e).text())},numeric:function(e){var a=t(e).data("value")||t(e).text().replace(/[^0-9.\-]/g,"");return a=parseFloat(a),isNaN(a)&&(a=0),a}},addRowToggle:!0,calculateWidthOverride:null,toggleSelector:" > tbody > tr:not(.footable-row-detail)",columnDataSelector:"> thead > tr:last-child > th, > thead > tr:last-child > td",detailSeparator:":",toggleHTMLElement:"<span />",createGroupedDetail:function(t){for(var e={_none:{name:null,data:[]}},a=0;a<t.length;a++){var o=t[a].group;null!==o?(o in e||(e[o]={name:t[a].groupName||t[a].group,data:[]}),e[o].data.push(t[a])):e._none.data.push(t[a])}return e},createDetail:function(e,a,o,i,n){var r=o(a);for(var l in r)if(0!==r[l].data.length){"_none"!==l&&e.append('<div class="'+n.detailInnerGroup+'">'+r[l].name+"</div>");for(var d=0;d<r[l].data.length;d++){var s=r[l].data[d].name?i:"";e.append(t("<div></div>").addClass(n.detailInnerRow).append(t("<div></div>").addClass(n.detailInnerName).append(r[l].data[d].name+s)).append(t("<div></div>").addClass(n.detailInnerValue).attr("data-bind-value",r[l].data[d].bindName).append(r[l].data[d].display)))}}},classes:{main:"footable",loading:"footable-loading",loaded:"footable-loaded",toggle:"footable-toggle",disabled:"footable-disabled",detail:"footable-row-detail",detailCell:"footable-row-detail-cell",detailInner:"footable-row-detail-inner",detailInnerRow:"footable-row-detail-row",detailInnerGroup:"footable-row-detail-group",detailInnerName:"footable-row-detail-name",detailInnerValue:"footable-row-detail-value",detailShow:"footable-detail-show"},triggers:{initialize:"footable_initialize",resize:"footable_resize",redraw:"footable_redraw",toggleRow:"footable_toggle_row",expandFirstRow:"footable_expand_first_row",expandAll:"footable_expand_all",collapseAll:"footable_collapse_all"},events:{alreadyInitialized:"footable_already_initialized",initializing:"footable_initializing",initialized:"footable_initialized",resizing:"footable_resizing",resized:"footable_resized",redrawn:"footable_redrawn",breakpoint:"footable_breakpoint",columnData:"footable_column_data",rowDetailUpdating:"footable_row_detail_updating",rowDetailUpdated:"footable_row_detail_updated",rowCollapsed:"footable_row_collapsed",rowExpanded:"footable_row_expanded",rowRemoved:"footable_row_removed",reset:"footable_reset"},debug:!1,log:null},version:{major:0,minor:5,toString:function(){return e.footable.version.major+"."+e.footable.version.minor},parse:function(t){var e=/(\d+)\.?(\d+)?\.?(\d+)?/.exec(t);return{major:parseInt(e[1],10)||0,minor:parseInt(e[2],10)||0,patch:parseInt(e[3],10)||0}}},plugins:{_validate:function(a){if(!t.isFunction(a))return e.footable.options.debug===!0&&console.error('Validation failed, expected type "function", received type "{0}".',typeof a),!1;var o=new a;return"string"!=typeof o.name?(e.footable.options.debug===!0&&console.error('Validation failed, plugin does not implement a string property called "name".',o),!1):t.isFunction(o.init)?(e.footable.options.debug===!0&&console.log('Validation succeeded for plugin "'+o.name+'".',o),!0):(e.footable.options.debug===!0&&console.error('Validation failed, plugin "'+o.name+'" does not implement a function called "init".',o),!1)},registered:[],register:function(a,o){e.footable.plugins._validate(a)&&(e.footable.plugins.registered.push(a),"object"==typeof o&&t.extend(!0,e.footable.options,o))},load:function(t){var a,o,i=[];for(o=0;o<e.footable.plugins.registered.length;o++)try{a=e.footable.plugins.registered[o],i.push(new a(t))}catch(n){e.footable.options.debug===!0&&console.error(n)}return i},init:function(t){for(var a=0;a<t.plugins.length;a++)try{t.plugins[a].init(t)}catch(o){e.footable.options.debug===!0&&console.error(o)}}}};var n=0;t.fn.footable=function(a){a=a||{};var o=t.extend(!0,{},e.footable.options,a);return this.each(function(){n++;var e=new i(this,o,n);t(this).data("footable",e)})}}(jQuery,window),function(t,e,a){function o(){var e=this;e.name="Footable Sortable",e.init=function(a){e.footable=a,a.options.sort===!0&&t(a.table).unbind(".sorting").bind({"footable_initialized.sorting":function(o){var i,n,r=t(a.table),l=(r.find("> tbody"),a.options.classes.sort);if(r.data("sort")!==!1){r.find("> thead > tr:last-child > th, > thead > tr:last-child > td").each(function(e){var o=t(this),i=a.columns[o.index()];i.sort.ignore===!0||o.hasClass(l.sortable)||(o.addClass(l.sortable),t("<span />").addClass(l.indicator).appendTo(o))}),r.find("> thead > tr:last-child > th."+l.sortable+", > thead > tr:last-child > td."+l.sortable).unbind("click.footable").bind("click.footable",function(a){a.preventDefault(),n=t(this);var o=!n.hasClass(l.sorted);return e.doSort(n.index(),o),!1});var d=!1;for(var s in a.columns)if(i=a.columns[s],i.sort.initial){var u="descending"!==i.sort.initial;e.doSort(i.index,u);break}d&&a.bindToggleSelectors()}},"footable_redrawn.sorting":function(o){var i=t(a.table),n=a.options.classes.sort;i.data("sorted")>=0&&i.find("> thead > tr:last-child > th").each(function(a){var o=t(this);return o.hasClass(n.sorted)||o.hasClass(n.descending)?void e.doSort(a):void 0})},"footable_column_data.sorting":function(e){var a=t(e.column.th);e.column.data.sort=e.column.data.sort||{},e.column.data.sort.initial=a.data("sort-initial")||!1,e.column.data.sort.ignore=a.data("sort-ignore")||!1,e.column.data.sort.selector=a.data("sort-selector")||null;var o=a.data("sort-match")||0;o>=e.column.data.matches.length&&(o=0),e.column.data.sort.match=e.column.data.matches[o]}}).data("footable-sort",e)},e.doSort=function(o,i){var n=e.footable;if(t(n.table).data("sort")!==!1){var r=t(n.table),l=r.find("> tbody"),d=n.columns[o],s=r.find("> thead > tr:last-child > th:eq("+o+")"),u=n.options.classes.sort,f=n.options.events.sort;if(i=i===a?s.hasClass(u.sorted):"toggle"===i?!s.hasClass(u.sorted):i,d.sort.ignore===!0)return!0;var c=n.raise(f.sorting,{column:d,direction:i?"ASC":"DESC"});c&&c.result===!1||(r.data("sorted",d.index),r.find("> thead > tr:last-child > th, > thead > tr:last-child > td").not(s).removeClass(u.sorted+" "+u.descending),i===a&&(i=s.hasClass(u.sorted)),i?s.removeClass(u.descending).addClass(u.sorted):s.removeClass(u.sorted).addClass(u.descending),e.sort(n,l,d,i),n.bindToggleSelectors(),n.raise(f.sorted,{column:d,direction:i?"ASC":"DESC"}))}},e.rows=function(e,o,i){var n=[];return o.find("> tr").each(function(){var o=t(this),r=null;if(o.hasClass(e.options.classes.detail))return!0;o.next().hasClass(e.options.classes.detail)&&(r=o.next().get(0));var l={row:o,detail:r};return i!==a&&(l.value=e.parse(this.cells[i.sort.match],i)),n.push(l),!0}).detach(),n},e.sort=function(t,a,o,i){var n=e.rows(t,a,o),r=t.options.sorters[o.type]||t.options.sorters.alpha;n.sort(function(t,e){return i?r(t.value,e.value):r(e.value,t.value)});for(var l=0;l<n.length;l++)a.append(n[l].row),null!==n[l].detail&&a.append(n[l].detail)}}if(e.footable===a||null===e.footable)throw new Error("Please check and make sure footable.js is included in the page and is loaded prior to this script.");var i={sort:!0,sorters:{alpha:function(t,e){return"string"==typeof t&&(t=t.toLowerCase()),"string"==typeof e&&(e=e.toLowerCase()),t===e?0:e>t?-1:1},numeric:function(t,e){return t-e}},classes:{sort:{sortable:"footable-sortable",sorted:"footable-sorted",descending:"footable-sorted-desc",indicator:"footable-sort-indicator"}},events:{sort:{sorting:"footable_sorting",sorted:"footable_sorted"}}};e.footable.plugins.register(o,i)}(jQuery,window),dsvInitFootable();