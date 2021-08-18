class Card < ApplicationRecord
  serialize :settings, Hash
end
