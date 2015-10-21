//* TITLE Quick Preferences **//
//* VERSION 0.2 REV A **//
//* DESCRIPTION Adds quick preferences in a nice Tumblr fashion. **//
//* DEVELOPER CodeFennec **//
//* FRAME false **//
//* BETA true **//

XKit.extensions.quick_preferences = new Object({

	running: false,
	injected: false,
	is_open: false,

	run: function() {
		this.running = true;

		XKit.tools.init_css("quick_preferences");
	},

	open: function() {
		if (this.is_open === true) {
			XKit.extensions.quick_preferences.close();
		} else /*if (this.injected !== true)*/ {
			var installed = XKit.installed.list();
			var n_html = "";
			for (i=0; i < installed.length; i++) {
				var m_extension = XKit.installed.get(installed[i]);
				var m_id = m_extension.id;
				if ((typeof XKit.extensions[m_id].quick_preferences === "undefined") || (XKit.extensions[m_id].running === false)) {
					continue;
				}

				var extension_title = m_extension.title;
				if (extension_title.indexOf(" ") === 0) {
					extension_title = extension_title.slice(1);
				}
				if (extension_title === "") {
					extension_title = m_id;
				}

				var prefs_list = "";
				var quick_pref = "";
				for (var pref in XKit.extensions[m_id].quick_preferences) {
					var pref_obj = XKit.extensions[m_id].quick_preferences[pref];
					if (pref_obj.type == "quick") {
						quick_pref = "<div class=\"popover_item_suffix\"><a role=\"link\" data-extension-id=\"" + m_id + "\" data-pref-id=\"" + pref + "\">" + pref_obj.text + "</div>";
					} else {
						prefs_list += "<li class=\"popover_menu_item\">" +
								"<a class=\"popover_menu_item_anchor\" data-extension-id=\"" + m_id + "\" data-pref-id=\"" + pref + "\">" +
									"<i class=\"popover_menu_item_anchor_icon icon_" + pref_obj.icon +"\"></i> " + pref_obj.text + "</a>" +
							"</li>";
					}
				}

				n_html += "<li class=\"popover_subsection\">" +
					"<div class=\"popover_header\">" + extension_title + quick_pref + "</div>" +
					"<ul class=\"popover_menu_list\">" +
						prefs_list +
					"</ul>" +
				"</li>";
			}



			var m_html = "<div class=\"popover--xkit-popover popover--base bottom\" style=\"visibility: visible; position: fixed; left: auto; top: 44px; right: 30px;\">" +
					"<div class=\"popover popover_menu popover_gradient\" style=\"width: 240px;\">" +
						"<div class=\"popover_inner\">" +
							"<ul class=\"popover_inner_list\">" +
								"<li class=\"popover_subsection\">" +
									"<div class=\"popover_header\">XKit <div class=\"popover_item_suffix\"><a role=\"link\" id=\"xkit_about_link\">Version " + XKit.version + "</a></div></div>" +
									"<ul class=\"popover_menu_list\">" +
										"<li class=\"popover_menu_item\">" +
											"<a class=\"popover_menu_item_anchor\" id=\"xkit_news_link\"><div class=\"popover_item_suffix\">" + XKit.extensions.xkit_preferences.news.unread_count() + "</div>News</a>" +
										"</li>" +
										"<li class=\"popover_menu_item\">" +
											"<a class=\"popover_menu_item_anchor\" id=\"xkit_preferences_link\"><i class=\"popover_menu_item_anchor_icon icon_settings\"></i> Preferences</a>" +
										"</li>" +
									"</ul>" +
								"</li>" +
								n_html +
							"</ul>" +
						"</div>" +
					"</div>" +
			    "</div>";
			$("body").append(m_html);
			//this.injected = true;
			$(".popover--xkit-popover .popover").addClass("popover--active");
			$("#new-xkit-control").addClass("active");
			this.is_open = true;
		/*} else {
			$(".popover--xkit-popover").show();
			$(".popover--xkit-popover .popover").addClass("popover--active");
			$("#new-xkit-control").addClass("active");
			this.is_open = true;*/
		}

		$(".l-container").click(function() {
			XKit.extensions.quick_preferences.close();
		});

		$("#xkit_about_link").click(function() {
			XKit.extensions.xkit_preferences.open();
			XKit.extensions.xkit_preferences.show_about();
			XKit.extensions.quick_preferences.close();
		});

		$("#xkit_news_link").click(function() {
			XKit.extensions.xkit_preferences.open(true);
			XKit.extensions.quick_preferences.close();
		});

		$("#xkit_blacklist_quick").click(function() {
			XKit.extensions.blacklist.show_add("", "", true);
			XKit.extensions.quick_preferences.close();
		});

		$("#xkit_preferences_link").click(function() {
			XKit.extensions.xkit_preferences.open();
			XKit.extensions.quick_preferences.close();
		});

		$(".popover--xkit-popover a").click(function() {
			XKit.extensions.quick_preferences.close();
			var extension_name = $(this).attr("data-extension-id");
			var extension_func = $(this).attr("data-pref-id");
			if ((extension_name !== undefined) || (extension_func !== undefined)) {
				if (extension_func === "open_prefs") {
					XKit.extensions.xkit_preferences.open();
					XKit.extensions.xkit_preferences.open_extension_control_panel(extension_name);
				} else {
					XKit.extensions[extension_name][extension_func]();
				}
			}
		});
	},

	close: function() {
		$(".popover--xkit-popover .popover").removeClass("popover--active");
		$("#new-xkit-control").removeClass("active");
		$(".popover--xkit-popover").remove();
		this.is_open = false;
	},

	destroy: function() {
		XKit.extensions.quick_preferences.close();
		$(".popover--xkit-popover").remove();
		$("#xkit-control").removeClass("active");
		this.running = false;
	}

});
