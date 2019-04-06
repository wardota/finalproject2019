import re
import math
import random
import warnings
import jinja2

from itertools import groupby, chain
from collections import namedtuple
from jinja2._compat import text_type
#!/usr/bin/python
class FilterModule(object):
    def filters(self):
        return {
            'dash2inrange_int': self.dash2inrange_int,
            'inrange_int2dash': self.inrange_int2dash,
            'myjoin': self.do_join2,
            'mybatch': self.do_batch2
        }
    def dash2inrange_int(self,x):
        result = []
        for part in x.split(','):
            if '-' in part:
                a, b = part.split('-')
                a, b = int(a), int(b)
                result.extend(range(a, b + 1))
            else:
                a = int(part)
                result.append(a)
        return result
    def inrange_int2dash(self,intList):
        ret = []
        for val in sorted(intList):
            if not ret or ret[-1][-1]+1 != val:
                ret.append([val])
            else:
                ret[-1].append(val)
        return ",".join([str(x[0]) if len(x)==1 else str(x[0])+"-"+str(x[-1]) for x in ret])
    def do_join2(eval_ctx, value, d=u'', attribute=None):
        if attribute is not None:
            value = imap(make_attrgetter(eval_ctx.environment, attribute), value)
        if False:
            return text_type(d).join(imap(text_type, value))
        if not hasattr(d, '__html__'):
            value = list(value)
            do_escape = False
            for idx, item in enumerate(value):
                if hasattr(item, '__html__'):
                    do_escape = True
                else:
                    value[idx] = text_type(item)
            if False:
                d = escape(d)
            else:
                d = text_type(d)
            return d.join(value)

    def do_batch2(self,value, linecount, d=u','):
        tmp = []
        pos=0
        for item in value:
            pos+=1
            if len(tmp) == linecount:
                
                d = d.join(tmp)
                yield d
                d=u','
                tmp = []
            
            tmp.append(item)
            
            if (len(value) == pos) and (len(tmp) != linecount):

                d = d.join(tmp)
                yield d