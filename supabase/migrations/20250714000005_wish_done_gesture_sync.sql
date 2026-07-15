-- Gesture index for filtered queries + wish-done → ticked sync trigger

CREATE INDEX IF NOT EXISTS idx_collection_gestures_user_gesture
  ON collection_gestures(user_id, gesture);

-- When a wish sourced from a collection item is marked done, tick that item.
CREATE OR REPLACE FUNCTION sync_collection_gesture_on_wish_done()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.status = 'done' AND NEW.source_collection_item_id IS NOT NULL THEN
    INSERT INTO collection_gestures (user_id, collection_item_id, gesture)
    VALUES (NEW.user_id, NEW.source_collection_item_id, 'ticked')
    ON CONFLICT (user_id, collection_item_id)
    DO UPDATE SET gesture = 'ticked', updated_at = now();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

DROP TRIGGER IF EXISTS trg_wish_done_sync_gesture ON wishes;

CREATE TRIGGER trg_wish_done_sync_gesture
  AFTER INSERT OR UPDATE OF status ON wishes
  FOR EACH ROW
  WHEN (NEW.status = 'done' AND NEW.source_collection_item_id IS NOT NULL)
  EXECUTE FUNCTION sync_collection_gesture_on_wish_done();
