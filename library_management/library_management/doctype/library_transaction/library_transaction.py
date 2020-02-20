from __future__ import unicode_literals
import frappe
from frappe import _
from frappe.model.document import Document
from frappe.utils import format_date

class LibraryTransaction(Document):
	def validate(self):
		tran_date=""
		date=""
		
		last_transaction = frappe.get_list("Library Transaction",
			fields=["transaction_type", "transaction_date", "creation"],
			filters = {
				"article": self.article,
				"transaction_date": ("<=", self.transaction_date),
				"name": ("!=", self.name),
			})
		frappe.utils.nowdate()
		tran_date=self.transaction_date
		if tran_date < date:
			frappe.msgprint(_("Tranzaction Date Should be Lesser then Today."))
		if self.transaction_type=="Issue":
			msg = _("Article {0} {1} has not been recorded as returned since {2}")
			if last_transaction and last_transaction[0].transaction_type=="Issue":
				frappe.throw(msg.format(self.article, self.article_name,
					last_transaction[0].transaction_date))
		else:
			if not last_transaction or last_transaction[0].transaction_type!="Issue":
				frappe.throw(_("Cannot return article not issued"))