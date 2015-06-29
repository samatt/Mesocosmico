import sys
import random
import csv
from urllib2 import Request,urlopen
import xml.etree.ElementTree as ET
from BeautifulSoup import BeautifulSoup
from pprint import pprint
import json

input_country_ids = {"chn":710,
				"usa":2,
				"jpn":740,
				"fra":220,
				"nld":210,
				"rus":365,
				"gbr":200,
				"mex":70,
				"are":160,
				"ind":750,
				"aus":900,
				"bra":140,
				"tur":640,
				"nga":475,
				"isr":666,
				"ken":30,
				"kor":732,
				"prk":731}
#no hkg data

# "hkg":167,
def get_cites_data(src=input_country_ids["tur"],dst=input_country_ids["jpn"]):
	# print src,dst
	src = input_country_ids[src]
	dst = input_country_ids[dst]

	url =("http://nisatapps.prio.org/Results_SQL.aspx?"\
		"C1=%d"\
		"&C2=%d"\
		"&p=Imports"\
		"&Dep1=0"\
		"&Dep2=False"\
		"&r=False"\
		"&W=100"\
		"&dtl=3"\
		"&Y=2000"\
		"&d=99"\
		"&t=3"\
		"&dls=True"\
		"&csv=False"\
		"&EY=2013"\
		"&scp=3")%(src,dst)

	request = Request(url)
	response = urlopen(request).read()

	html = BeautifulSoup(response)
	tables = html.findAll("table")
	headers = html.findAll("font",{"color":"#00718F","size":"4"})
	
	results = {"data":[],"hasData":False}
	try:
		for j in xrange(len(tables)):

			# print "%s - %s"%(src,dst)
			# print headers[j].text
			year = headers[j].text.split(" ")[-1]
			# print year
			# results[year] =  []
			results["hasData"] = True
			children = tables[j].findAll("td")
			for i in xrange(0,len(children),14):
				if (i+10) in xrange(len(children)):
					r = {}
					r['type'] = children[i+2].text.split("(")[0].strip()
					if len(children[i+3].text) > 0:
						r['units'] = children[i+3].text.replace(" ",",").strip()
					else:
						r['units'] = "N/A"
					r['value'] = children[i+4].text.replace(" ",",").strip()
					r['year'] = year
					results["data"].append(r)
	except Exception, e:
		pass
	# if len(results.keys()) >0:
	# 	# pprint(results)		
	# 	pass
	# else:
	# 	results["hasData"] = False
	print json.dumps(results)
	# pprint(results)
if __name__ == '__main__':

	if len(sys.argv) <3 :
		print "Not enough arguments using random countries"
		src =random.choice(input_country_ids.keys())
		dst =random.choice(input_country_ids.keys())
		
		get_cites_data(src,dst)
	else:
		src = sys.argv[1].encode('ascii','ignore')
		dst = sys.argv[2].encode('ascii','ignore')
			
		if src == "hkg" or dst == "hkg":
			# results = {"data":[],"hasData":False}
			print json.dumps({"data":[],"hasData":False})
		else:
			get_cites_data(src,dst)