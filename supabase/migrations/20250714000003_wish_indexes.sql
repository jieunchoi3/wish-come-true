-- Additional wish indexes for queries
CREATE INDEX IF NOT EXISTS idx_wishes_user_snoozed_until
  ON wishes(user_id, snoozed_until);

CREATE INDEX IF NOT EXISTS idx_wishes_topic_tags_gin
  ON wishes USING GIN(topic_tags);
