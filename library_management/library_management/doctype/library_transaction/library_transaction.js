// Copyright (c) 2020, Devarsh and contributors
// For license information, please see license.txt

frappe.ui.form.on('Library Transaction', {
	"library_member": function (frm) {
		console.log(frm);
		if (frm.doc.transaction_type === "Issue")
			if (date < frm.doc.transaction_date) {
				frappe.model.set_value(frm.doctype,
					frm.docname, "transaction_date", "")
				frappe.msgprint(__("Tranzaction Date Should be Lesser then Today"))
			}
		frappe.call({
			"method": "frappe.client.get",
			args: {
				doctype: "Library Member",
				name: frm.doc.library_member
			},
			callback: function (data) {
				frappe.model.set_value(frm.doctype,
					frm.docname, "member_name",
					data.message.first_name
					+ (data.message.last_name ?
						(" " + data.message.last_name) : ""))
			},

		})
	},
	"transaction_date": function (frm) {
		let date = frappe.datetime.now_date()
		// frappe.model.set_value(frm.doctype,
		// 	frm.docname, "transaction_date", $('.transaction_date').datepicker({ maxDate: date }))
		if (frm.doc.transaction_type === "Issue")
			if (date < frm.doc.transaction_date) {
				frappe.model.set_value(frm.doctype,
					frm.docname, "transaction_date", "")
				frappe.msgprint(__("Tranzaction Date Should be Lesser then Today"))
			}
	}
});
