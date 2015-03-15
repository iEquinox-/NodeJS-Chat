import sys,types

class Bot():
	def __init__(self):
		self.commands = {
				"help": self.Help()
			}
			
	def CMD(self, cmd=None):
		if(not isinstance(cmd, types.NoneType)):
			return self.commands[cmd]
			
	def Help(self):
		return "NJS Chatbot v1."

sys.stdout.write(str( Bot().CMD(cmd=sys.argv[1]) ))
