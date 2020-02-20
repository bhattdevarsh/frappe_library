frappe.pages['smart'].on_page_load = function (wrapper) {
	var page = frappe.ui.make_app_page({
		parent: wrapper,
		title: 'Smart Page',
		single_column: true
	});
	let $btn = page.set_primary_action('New', () => create_new(), 'octicon octicon-plus', 'working')
	let $btn2 = page.set_secondary_action('New', () => create_new(), 'octicon octicon-plus', 'called')
	page.set_title_sub('This is for Desk Users')
	page.set_indicator('Pending', 'red')
	page.add_inner_button('Update Posts', () => { frappe.msgprint("updated") })
	page.add_menu_item('Send Email', () => open_email_dialog(), true)
	//page.set_indicator('saved', 'green')
}