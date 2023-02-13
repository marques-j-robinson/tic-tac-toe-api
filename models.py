class Game:

	def __init__(self, game_id, history, timestamp):
		self.id = game_id
		self.history = history
		self.timestamp = timestamp

	def __repr__(self):
		return f'<id {self.id}>'

	def serialize(self):
		return {
			'id': self.id,
			'history': self.history,
			'timestamp': self.timestamp
		}